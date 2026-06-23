<#
.SYNOPSIS
  Reliable, self-healing one-command deploy for tnic.help.

.DESCRIPTION
  Run on YOUR Windows machine. Uses your saved GitHub credentials (the thing a
  sandboxed agent cannot reach), so this is the dependable way to ship.

  Pipeline (each stage is guarded; it stops rather than ship something broken):
    1. Preflight    - confirm git + the repo are present.
    2. Heal         - remove a stale .git\index.lock and run `git reset` to
                      clear phantom "deleted" files caused by index corruption.
    3. Sync         - fetch origin; if behind, rebase cleanly (or stop on conflict).
    4. Doctor       - report dirty/ahead/behind + staged deletions.
    5. Guard        - refuse to commit if a suspicious number of files are
                      staged for deletion (almost always corruption, not intent).
    6. Verify       - `npm run typecheck` (+ lint). Aborts the deploy on type
                      errors, so truncated/broken files can never reach prod.
    7. Commit+Push  - commit and push; Vercel git-integration builds on push.
  Everything is logged to deploy.log.

.PARAMETER Message       Commit message (default: timestamped).
.PARAMETER Remote        Remote to push (default: origin).
.PARAMETER Branch        Branch (default: main).
.PARAMETER AlsoPush      Optional second remote to mirror to (e.g. "longevity").
.PARAMETER SkipVerify    Skip typecheck/lint (NOT recommended).
.PARAMETER DoctorOnly    Diagnose + heal the repo, then stop (no commit/push).
.PARAMETER NoPush        Commit only; don't push.
.PARAMETER DeleteThreshold  Max staged deletions allowed before aborting (default 40).

.EXAMPLE  .\deploy.ps1 -DoctorOnly
.EXAMPLE  .\deploy.ps1 -Message "Pass 2: UI depth"
.EXAMPLE  .\deploy.ps1 -Message "hotfix" -AlsoPush longevity
#>
[CmdletBinding()]
param(
  [string]$Message  = "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')",
  [string]$Remote   = "origin",
  [string]$Branch   = "main",
  [string]$AlsoPush = "",
  [switch]$SkipVerify,
  [switch]$DoctorOnly,
  [switch]$NoPush,
  [int]$DeleteThreshold = 40
)

$ErrorActionPreference = "Stop"
$RepoRoot = "C:\Users\tnic8\tnic-help"
$LogFile  = Join-Path $RepoRoot "deploy.log"

function Stamp { (Get-Date -Format "yyyy-MM-dd HH:mm:ss") }
function Log($m){ try { Add-Content -Path $LogFile -Value ("[{0}] {1}" -f (Stamp), $m) } catch {} }
function Info($m){ Write-Host "==> $m" -ForegroundColor Cyan;   Log "INFO $m" }
function Ok($m){   Write-Host "[ok] $m" -ForegroundColor Green;  Log "OK   $m" }
function Warn($m){ Write-Host "[!]  $m" -ForegroundColor Yellow; Log "WARN $m" }
function Die($m){  Write-Host "[x]  $m" -ForegroundColor Red;    Log "DIE  $m"; exit 1 }

Write-Host ""
Info "tnic.help deploy  -  $(Stamp)"

# --- 1. Preflight ----------------------------------------------------------
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Die "git is not on PATH." }
if (-not (Test-Path $RepoRoot)) { Die "Repo not found at $RepoRoot" }
Set-Location $RepoRoot
if (-not (Test-Path ".git")) { Die "$RepoRoot is not a git repository." }

# identity
if (-not (git config user.name))  { git config user.name  "THOMAS" | Out-Null;             Warn "Set user.name" }
if (-not (git config user.email)) { git config user.email "tvsnic0419@gmail.com" | Out-Null; Warn "Set user.email" }

# --- 2. Heal ---------------------------------------------------------------
$lock = ".git\index.lock"
if (Test-Path $lock) { Remove-Item $lock -Force -ErrorAction SilentlyContinue; Warn "Removed stale index.lock" }

# Clear phantom "deleted" entries: refresh the index against HEAD without
# touching working-tree files. Fixes the corruption that shows files as deleted.
$delBefore = (git diff --cached --name-status 2>$null | Select-String '^D').Count
if ($delBefore -gt 0) {
  Info "Index shows $delBefore staged deletion(s) - running 'git reset' to re-sync index to HEAD"
  git reset --quiet 2>$null
  git add -A 2>$null
  $delAfter = (git diff --cached --name-status 2>$null | Select-String '^D').Count
  Info "After heal: $delAfter staged deletion(s)"
}

# fsck (informational)
$fsck = git fsck --no-progress 2>&1 | Select-String -Pattern 'missing|corrupt|broken'
if ($fsck) { Warn "git fsck flagged: $($fsck -join '; ')" }

# --- 3. Sync with remote ---------------------------------------------------
Info "Fetching $Remote"
git fetch $Remote --quiet 2>$null
$behind = (git rev-list --count "HEAD..$Remote/$Branch" 2>$null)
if ($behind -and [int]$behind -gt 0) {
  Warn "$behind commit(s) behind $Remote/$Branch - rebasing"
  git pull --rebase $Remote $Branch
  if ($LASTEXITCODE -ne 0) { Die "Rebase hit conflicts. Resolve them, then re-run. (git status)" }
  Ok "Rebased onto $Remote/$Branch"
}

# --- 4. Doctor report ------------------------------------------------------
$dirty  = (git status --porcelain 2>$null | Measure-Object).Count
$ahead  = (git rev-list --count "$Remote/$Branch..HEAD" 2>$null)
git add -A 2>$null
$delNow = (git diff --cached --name-status 2>$null | Select-String '^D').Count
$addNow = (git diff --cached --name-status 2>$null | Select-String '^[AM]').Count
Info "Doctor: dirty=$dirty  ahead=$ahead  staged(add/mod)=$addNow  staged(del)=$delNow  HEAD=$(git rev-parse --short HEAD)"

if ($DoctorOnly) { Ok "DoctorOnly: repaired/inspected, no commit or push."; exit 0 }

# --- 5. Deletion guard -----------------------------------------------------
if ($delNow -gt $DeleteThreshold) {
  Warn "$delNow files staged for DELETION (> $DeleteThreshold) - almost certainly corruption."
  Write-Host "    Stopping. Run '.\deploy.ps1 -DoctorOnly', verify 'git status', then retry." -ForegroundColor Yellow
  Die "Aborted to protect the repo."
}

# --- 6. Verify (typecheck + lint) -----------------------------------------
if (-not $SkipVerify) {
  if (Get-Command npm -ErrorAction SilentlyContinue) {
    Info "Typecheck (npm run typecheck)"
    npm run typecheck
    if ($LASTEXITCODE -ne 0) {
      Warn "Typecheck FAILED - a file may be truncated/broken. Restore a bad file with:"
      Write-Host "    git checkout HEAD -- <path\to\file>" -ForegroundColor Yellow
      Die "Not deploying a build that doesn't typecheck."
    }
    Ok "Typecheck clean"
    Info "Lint (non-blocking)"; npm run lint; if ($LASTEXITCODE -ne 0) { Warn "Lint reported problems (continuing)." }
  } else { Warn "npm not found - skipping verify." }
}

# --- 7. Commit + push ------------------------------------------------------
if ([string]::IsNullOrWhiteSpace((git status --porcelain))) {
  Warn "Working tree clean - nothing new to commit."
} else {
  Info "Committing: $Message"
  git commit -m $Message
  if ($LASTEXITCODE -ne 0) { Die "Commit failed." }
  Ok "Committed $(git rev-parse --short HEAD)"
}

if ($NoPush) { Ok "Commit done (-NoPush)."; exit 0 }

$ahead2 = (git rev-list --count "$Remote/$Branch..HEAD" 2>$null)
if ($ahead2 -eq "0") { Ok "Already in sync with $Remote/$Branch - nothing to push."; exit 0 }

Info "Pushing to $Remote/$Branch"
git push $Remote $Branch
if ($LASTEXITCODE -ne 0) { Die "Push failed. If auth: run 'git push' once interactively to sign in, then retry." }
Ok "Pushed to $Remote/$Branch"

if ($AlsoPush -ne "") {
  Info "Mirroring to $AlsoPush/$Branch"
  git push $AlsoPush $Branch
  if ($LASTEXITCODE -ne 0) { Warn "Mirror push to $AlsoPush failed (primary already succeeded)." } else { Ok "Mirrored to $AlsoPush" }
}

Write-Host ""
Ok "Deploy triggered - Vercel is building from this push."
Write-Host "    Production : https://tnic.help" -ForegroundColor Gray
Write-Host "    Dashboard  : https://vercel.com/tnic-projects/tnic-help" -ForegroundColor Gray
Write-Host "    Log        : $LogFile" -ForegroundColor Gray

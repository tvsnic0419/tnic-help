@echo off
REM Double-click launcher for deploy.ps1 — runs it with an execution-policy
REM bypass so Windows doesn't block the unsigned script. Window stays open.
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy.ps1" %*
echo.
echo ===== deploy.cmd finished. You can close this window. =====
pause

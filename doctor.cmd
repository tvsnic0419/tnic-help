@echo off
REM Double-click to diagnose + heal the repo (no commit, no push).
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy.ps1" -DoctorOnly
echo.
echo ===== Doctor finished. Read the "Doctor:" line above. Safe to close. =====
pause

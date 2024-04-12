@echo off
powershell.exe -ExecutionPolicy Bypass -File "%~dp0\setup.ps1"
timeout /t 5 >nul
start "" "http://localhost:3000"
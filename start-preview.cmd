@echo off
cd /d "%~dp0"
start "Avenza Local Preview" /min python -m http.server 3000 --bind 127.0.0.1
start "" http://localhost:3000/

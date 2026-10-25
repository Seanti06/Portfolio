@echo off
title Playwright Live Visual Capture
echo ========================================================
echo Taking a fresh screenshot with Playwright...
echo ========================================================
python capture_preview.py
echo.
echo Done! Opening preview-desktop.png...
start "" "assets\preview-desktop.png"
pause

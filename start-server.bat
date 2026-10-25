@echo off
chcp 65001 > nul
title Portfolio Localhost Dev Server
echo ========================================================
echo Starting your portfolio website on localhost...
echo ========================================================
python serve.py
pause

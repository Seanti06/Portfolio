@echo off
chcp 65001 >nul
echo ========================================================
echo   Uploading Sean Manuel Chua's Portfolio to GitHub...
echo ========================================================
echo.

echo 1. Pushing your portfolio to https://github.com/Seanti06/Portfolio...
echo    If a browser window opens, click 'Sign in with your browser' to authorize.
echo.

git push -u origin main --force

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCESS! Your portfolio is uploaded to GitHub!
    echo   Repository: https://github.com/Seanti06/Portfolio
    echo ========================================================
    echo.
    echo Next step to view it live on the internet:
    echo 1. Go to your repo: https://github.com/Seanti06/Portfolio
    echo 2. Click Settings -^> Pages (left sidebar)
    echo 3. Under Branch, select 'main' and click Save!
    echo.
) else (
    echo.
    echo Push did not complete. If you need assistance, let me know in chat!
)
echo.
pause

@echo off
:: 获取当前日期和时间
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~0,4%"
set "MM=%dt:~4,2%"
set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%"
set "MI=%dt:~10,2%"
set "SS=%dt:~12,2%"
set "DATESTR=%YY%-%MM%-%DD%_%HH%-%MI%-%SS%"


:: 检查是否有未提交的改动
git status

:: 添加新文件到暂存区
git add .

:: 提交更改
git commit -m "Updated blog with time: %DATESTR%"

:: 推送到GitHub
git push origin main || (
  echo Failed to push to GitHub.
  exit /b 1
)

echo Successfully pushed file to GitHub.
pause
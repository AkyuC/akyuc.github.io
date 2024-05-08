@echo off
:: 获取当前日期和时间
set DATESTR=%DATE:~10,4%-%DATE:~7,2%-%DATE:~4,2%_%TIME:~0,2%-%TIME:~3,2%-%TIME:~6,2%

:: 检查是否有未提交的改动
git status

:: 添加新文件到暂存区
git add "."

:: 提交更改
git commit -m "Added file with current time: %DATESTR%"

:: 推送到GitHub
git push origin main || (
  echo Failed to push to GitHub.
  exit /b 1
)

echo Successfully pushed file to GitHub.
pause
@echo off
setlocal
pushd "%~dp0..\..\workspace"
if "%~1"=="" (
  echo Usage: Render-Manim.cmd -pql projects\your-project\scene.py SceneName
  popd
  exit /b 0
) else (
  "%~dp0..\tools\manim\.venv\Scripts\python.exe" -m manim --config_file "%~dp0..\config\manim.cfg" %*
)
set "result=%errorlevel%"
popd
exit /b %result%

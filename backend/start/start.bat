@echo off

cd "..\.."
call ".venv/Scripts/activate.bat"

python backend/backend.py
pause
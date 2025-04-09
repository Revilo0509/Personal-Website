@echo off
set FLASK_ENV=development
set FLASK_PORT=1515

cd "..\..\.."
call ".venv/Scripts/activate.bat"

flask --app src/backend/backend run --port %FLASK_PORT% --debug
pause
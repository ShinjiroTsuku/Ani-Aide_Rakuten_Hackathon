@echo off
echo Starting development environment...

echo.
echo 1. Starting backend server...
cd backend
start "Backend Server" cmd /k "python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

echo.
echo 2. Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo 3. Starting frontend server...
cd ../frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Development environment started!
echo Backend URL: http://localhost:8000
echo Frontend URL: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul 
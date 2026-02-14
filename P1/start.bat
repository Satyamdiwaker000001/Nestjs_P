@echo off

echo =========================
echo  NestJS Server Starting
echo =========================

cd /d A:\Projects\Nestjs_P\P1\task-master_cli_backend

if not exist package.json (
    echo ERROR: Not a NestJS project folder
    pause
    exit /b
)

:: Start NestJS server in new terminal
start cmd /k npm run start:dev

:: Wait few seconds for server to boot
timeout /t 5 > nul

:: Open frontend
cd /d A:\Projects\Nestjs_P\P1\task-master_cli_frontend
start index.html

pause

@echo off

echo =========================
echo  NestJS Server Starting
echo =========================

cd /d A:\Projects\Nestjs_P\P1\task-master_cli_backend

if not exist package.json (
    echo ERROR: Not a NestJS project folder
    pause
    exit
)

npm run start:dev

pause

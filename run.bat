@echo off

:: 1. Chạy AI Service
start "AI Service" cmd /k "cd ai-service && python -m app.main"

:: 2. Chạy Backend (Spring Boot)
start "Backend API" cmd /k "cd backend && .\mvnw spring-boot:run"

:: 3. Chạy Frontend (React)
start "Frontend UI" cmd /k "cd frontend && npm run dev"

echo Da kich hoat xong 3 service!
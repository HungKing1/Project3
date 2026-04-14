@echo off

start "AI Service" cmd /k "cd ai-service && python -m app.main"

start "Backend API" cmd /k "cd backend && .\mvnw spring-boot:run"

start "Frontend UI" cmd /k "cd frontend && npm run dev"

echo Da kich hoat xong 3 service!
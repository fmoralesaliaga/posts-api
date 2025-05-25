#!/usr/bin/env pwsh
# PowerShell script to start the Posts API in development mode

Write-Host "🚀 Starting Posts API in development mode..." -ForegroundColor Green

# Check if PostgreSQL is running in Docker
Write-Host "📊 Checking PostgreSQL database..." -ForegroundColor Yellow
$dockerContainers = docker ps --format "table {{.Names}}\t{{.Status}}" | Select-String "posts-api-db"
if (-not $dockerContainers) {
    Write-Host "❌ PostgreSQL container not found. Starting Docker Compose..." -ForegroundColor Red
    docker-compose up -d
    Start-Sleep -Seconds 5
}

# Set environment variable for localhost database
$env:DATABASE_URL = "postgresql://admin:admin@localhost:5432/postsdb"

# Check if Prisma Client is generated
Write-Host "🔧 Ensuring Prisma Client is generated..." -ForegroundColor Yellow
npx prisma generate

# Start the development server
Write-Host "🌐 Starting server on http://localhost:3001" -ForegroundColor Green
Write-Host "📖 API Documentation: http://localhost:3001/docs" -ForegroundColor Cyan
Write-Host "❤️  Health Check: http://localhost:3001/health" -ForegroundColor Cyan
Write-Host "" 
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray

npm start

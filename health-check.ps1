# Health Check Script for Posts API
Write-Host "🔍 Checking Posts API Health..." -ForegroundColor Green

# Check if the server is running
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method Get -TimeoutSec 5
    Write-Host "✅ Server is running and healthy" -ForegroundColor Green
    Write-Host "   Status: $($response.status)" -ForegroundColor Cyan
    Write-Host "   Uptime: $([math]::Round($response.uptime, 2)) seconds" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Server is not responding. Make sure to start it with:" -ForegroundColor Red
    Write-Host "   npm run dev:local" -ForegroundColor Yellow
    exit 1
}

# Check detailed health
try {
    $detailedHealth = Invoke-RestMethod -Uri "http://localhost:3001/health/details" -Method Get -TimeoutSec 5
    Write-Host "📊 Detailed Health Check:" -ForegroundColor Green
    Write-Host "   Database: $($detailedHealth.database.status)" -ForegroundColor Cyan
    Write-Host "   Memory Usage: $($detailedHealth.system.memory.heapUsed)" -ForegroundColor Cyan
} catch {
    Write-Host "⚠️ Could not get detailed health information" -ForegroundColor Yellow
}

# Test API endpoints
try {
    $posts = Invoke-RestMethod -Uri "http://localhost:3001/posts" -Method Get -TimeoutSec 5
    Write-Host "✅ Posts endpoint is working" -ForegroundColor Green
    Write-Host "   Found $($posts.Count) posts" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Posts endpoint is not working" -ForegroundColor Red
}

Write-Host "`n🌐 Available endpoints:" -ForegroundColor Green
Write-Host "   • Health Check: http://localhost:3001/health" -ForegroundColor Cyan
Write-Host "   • API Documentation: http://localhost:3001/docs" -ForegroundColor Cyan
Write-Host "   • Posts API: http://localhost:3001/posts" -ForegroundColor Cyan

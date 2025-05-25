# Setup script for Posts API (PowerShell)
Write-Host "🚀 Setting up Posts API..." -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Generate Prisma client
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Check if Docker is available
if (Get-Command docker -ErrorAction SilentlyContinue) {
    Write-Host "🐳 Starting PostgreSQL with Docker..." -ForegroundColor Yellow
    npm run docker:db
    
    # Wait for database to be ready
    Write-Host "⏳ Waiting for database to be ready..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
    
    # Set DATABASE_URL for migrations (localhost since Docker exposes port 5432)
    $env:DATABASE_URL = "postgresql://admin:admin@localhost:5432/postsdb"
    
    # Run migrations
    Write-Host "🗄️ Running database migrations..." -ForegroundColor Yellow
    npx prisma migrate dev --name init
    
    # Seed database
    Write-Host "🌱 Seeding database..." -ForegroundColor Yellow
    npx prisma db seed
    
    Write-Host "✅ Setup complete! You can now run:" -ForegroundColor Green
    Write-Host "   npm run dev:local (for local development with Docker DB)" -ForegroundColor Cyan
    Write-Host "   npm run dev (for full Docker development)" -ForegroundColor Cyan
} else {
    Write-Host "⚠️ Docker not found. Please install Docker or setup PostgreSQL manually." -ForegroundColor Red
    Write-Host "📖 See README.md for manual setup instructions." -ForegroundColor Yellow
}

Write-Host "🌐 API will be available at: http://localhost:3001" -ForegroundColor Green
Write-Host "📚 Documentation at: http://localhost:3001/docs" -ForegroundColor Green
Write-Host "📋 Posts endpoint: http://localhost:3001/posts" -ForegroundColor Green

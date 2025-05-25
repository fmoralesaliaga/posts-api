#!/bin/bash
# Setup script for Posts API

echo "🚀 Setting up Posts API..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "🐳 Starting PostgreSQL with Docker..."
    npm run docker:db
    
    # Wait for database to be ready
    echo "⏳ Waiting for database to be ready..."
    sleep 10
    
    # Run migrations
    echo "🗄️ Running database migrations..."
    npm run migrate:dev --name init
    
    # Seed database
    echo "🌱 Seeding database..."
    npm run db:seed
    
    echo "✅ Setup complete! You can now run:"
    echo "   npm run dev:local (for local development)"
    echo "   npm run dev (for Docker development)"
else
    echo "⚠️ Docker not found. Please install Docker or setup PostgreSQL manually."
    echo "📖 See README.md for manual setup instructions."
fi

echo "🌐 API will be available at: http://localhost:3001"
echo "📚 Documentation at: http://localhost:3001/docs"

#!/bin/bash

echo "�� RecipePlanner Demo Startup Script"
echo "====================================="

# Check if in project root directory
if [ ! -f "README.md" ]; then
    echo "❌ Please run this script in the project root directory"
    exit 1
fi

echo "📦 Checking dependencies..."

# Check backend dependencies
if [ ! -d "backend/vendor" ]; then
    echo "📥 Installing backend dependencies..."
    cd backend
    composer install
    cd ..
else
    echo "✅ Backend dependencies installed"
fi

# Check frontend dependencies
if [ ! -d "frontend/node_modules" ]; then
    echo "📥 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
else
    echo "✅ Frontend dependencies installed"
fi

echo "🗄️ Setting up database..."

# Create database file
cd backend
if [ ! -f "database/database.sqlite" ]; then
    touch database/database.sqlite
    echo "✅ Database file created"
fi

# Run migrations
echo "🔄 Running database migrations..."
php artisan migrate --force

# Run seeders
echo "🌱 Running seeders..."
php artisan db:seed --force

echo "✅ Database setup complete"

echo "🚀 Starting servers..."

# Start backend server
echo "🔧 Starting backend server (port 8000)..."
php artisan serve --host=0.0.0.0 --port=8000 &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend server (port 5173)..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 RecipePlanner Demo is running!"
echo "=================================="
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:8000"
echo "📊 API Docs: http://localhost:8000/api"
echo ""
echo "🧪 Test Account:"
echo "   Email: test@example.com"
echo "   Password: password123"
echo ""
echo "📋 Demo Guide: Check DEMO_GUIDE.md"
echo ""
echo "⏹️  Stop servers: Ctrl+C"

# Wait for user interrupt
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '✅ Servers stopped'; exit" INT

# Keep script running
wait 
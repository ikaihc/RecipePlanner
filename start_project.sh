#!/bin/bash

# RecipePlanner - Project Startup Script
# This script sets up and starts the RecipePlanner application

echo "🚀 Starting RecipePlanner..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the project root
if [ ! -f "README.md" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    print_error "Please run this script from the RecipePlanner project root directory"
    exit 1
fi

print_status "Setting up RecipePlanner..."

# Backend setup
print_status "Setting up backend..."
cd backend

# Check if .env exists
if [ ! -f ".env" ]; then
    print_status "Creating .env file..."
    cp .env.example .env
    print_success ".env file created"
else
    print_status ".env file already exists"
fi

# Install PHP dependencies
print_status "Installing PHP dependencies..."
if composer install --no-interaction --no-progress; then
    print_success "PHP dependencies installed"
else
    print_error "Failed to install PHP dependencies"
    exit 1
fi

# Generate application key
print_status "Generating application key..."
if php artisan key:generate --no-interaction; then
    print_success "Application key generated"
else
    print_error "Failed to generate application key"
    exit 1
fi

# Create database if using SQLite
if [ "$DB_CONNECTION" = "sqlite" ] || [ ! -f "database/database.sqlite" ]; then
    print_status "Setting up SQLite database..."
    mkdir -p database
    touch database/database.sqlite
    print_success "SQLite database created"
fi

# Run migrations
print_status "Running database migrations..."
if php artisan migrate --force; then
    print_success "Database migrations completed"
else
    print_error "Failed to run database migrations"
    exit 1
fi

# Seed database
print_status "Seeding database..."
if php artisan db:seed --force; then
    print_success "Database seeded"
else
    print_warning "Database seeding failed or already seeded"
fi

cd ..

# Frontend setup
print_status "Setting up frontend..."
cd frontend

# Install Node.js dependencies
print_status "Installing Node.js dependencies..."
if npm install; then
    print_success "Node.js dependencies installed"
else
    print_error "Failed to install Node.js dependencies"
    exit 1
fi

# Build frontend
print_status "Building frontend..."
if npm run build; then
    print_success "Frontend built successfully"
else
    print_error "Failed to build frontend"
    exit 1
fi

cd ..

print_success "Setup completed successfully!"

# Display startup instructions
echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. Start the backend server:"
echo "   cd backend && php artisan serve"
echo ""
echo "2. Start the frontend server (in a new terminal):"
echo "   cd frontend && npm run dev"
echo ""
echo "3. Access the application:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:8000"
echo ""
echo "4. Login credentials:"
echo "   Email: test@example.com"
echo "   Password: password"
echo ""
echo "📚 Documentation:"
echo "   - Demo Guide: DEMO_FINAL_GUIDE.md"
echo "   - CI/CD Fixes: CI_CD_FIXES.md"
echo "   - README: README.md"
echo ""

print_success "RecipePlanner is ready to run! 🚀" 
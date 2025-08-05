# 🍳 RecipePlanner

[![Laravel](https://img.shields.io/badge/Laravel-12.x-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern social recipe sharing and meal planning platform that allows users to easily share, favorite, and organize recipes, create shopping lists, and plan weekly meals.

## ✨ Features

- 🍽️ **Recipe Management**: Create, edit, and share recipes with images
- ❤️ **Social Features**: Favorite and share recipes with the community
- 📝 **Shopping List**: Smart shopping list management with bulk import
- 📅 **Meal Planning**: Weekly meal planning with drag-and-drop interface
- 📱 **Responsive Design**: Perfect adaptation for mobile and desktop
- 🔐 **User Authentication**: Secure user system with token-based auth

## 🚀 Live Demo

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8000](http://localhost:8000)

## 🏗️ Tech Stack

### Backend
- **Framework**: Laravel 12
- **Database**: SQLite (Development) / MySQL (Production)
- **Authentication**: Laravel Sanctum
- **API**: RESTful API with 25+ endpoints
- **File Storage**: Local storage for images

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Axios

## 📦 Installation

### Prerequisites
- PHP 8.1+
- Node.js 18+
- Composer
- npm

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ikaihc/RecipePlanner.git
   cd RecipePlanner
   ```

2. **Run the startup script (Recommended)**
   ```bash
   chmod +x start_demo.sh
   ./start_demo.sh
   ```

3. **Or install manually**
   ```bash
   # Backend setup
   cd backend
   composer install
   touch database/database.sqlite
   php artisan migrate
   php artisan db:seed
   php artisan serve

   # Frontend setup (new terminal)
   cd frontend
   npm install
   npm run dev
   ```

## 🧪 Test Account

- **Email**: `test@example.com`
- **Password**: `password123`

## 📱 Features Demo

### User Authentication
- Secure registration and login system
- Token-based authentication
- Protected routes and API endpoints

### Recipe Management
- Create recipes with images and ingredients
- Edit and delete personal recipes
- Browse all public recipes
- Dynamic ingredient management

### Social Features
- Favorite/unfavorite recipes
- View personal favorites
- Share recipes with the community

### Shopping List
- Add ingredients from recipes
- Remove individual items
- Clear entire shopping list
- Real-time updates

### Meal Planning
- Weekly meal planning grid
- Add meals by day and meal type
- Support multiple meals per slot
- Recipe integration


## 📁 Project Structure

```
RecipePlanner/
├── backend/                 # Laravel Backend
│   ├── app/
│   │   ├── Http/Controllers/  # 8 Controllers
│   │   ├── Models/           # 6 Models
│   │   └── Providers/
│   ├── database/
│   │   ├── migrations/       # 15 Migrations
│   │   └── seeders/         # 4 Seeders
│   └── routes/
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # 15+ Components
│   │   ├── contexts/       # 2 Context Providers
│   │   ├── pages/          # 7 Pages
│   │   └── api/            # API Integration
│   └── public/
├── DEMO_GUIDE.md          # Demo Guide
├── start_demo.sh          # Startup Script
└── README.md              # Project Documentation
```

## 🎯 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### Recipes
- `GET /api/recipes` - Get all recipes
- `POST /api/recipes` - Create recipe
- `GET /api/recipes/{id}` - Get recipe details
- `PUT /api/recipes/{id}` - Update recipe
- `DELETE /api/recipes/{id}` - Delete recipe

### Shopping List
- `GET /api/shopping-list` - Get shopping list
- `POST /api/shopping-list/toggle` - Add/remove items
- `POST /api/shopping-list/from-recipe/{id}` - Add from recipe
- `DELETE /api/shopping-list/clear` - Clear list

### Meal Planning
- `GET /api/meal-plans` - Get meal plans
- `POST /api/meal-plans` - Add meal
- `DELETE /api/meal-plans/{id}` - Delete meal
- `DELETE /api/meal-plans/clear` - Clear plans

## 🎨 UI/UX Features

- **Modern Design**: Clean and beautiful interface
- **Responsive Layout**: Perfect adaptation for various devices
- **Smooth Interactions**: Rich animation effects
- **Intuitive Operations**: User-friendly interface design
- **Error Handling**: Complete error prompts

## 🔧 Development

### Backend Development
```bash
cd backend
php artisan serve
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Database Migrations
```bash
cd backend
php artisan migrate
php artisan db:seed
```

## 📊 Project Statistics

- **Backend**: 15+ API endpoints
- **Frontend**: 10+ page components
- **Database**: 6 data tables
- **Features**: 5 core modules
- **Routes**: 25+ API routes

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team Members

- **Bingyao LUO** - Project Lead & Full Stack Developer
- **Shan XING** - Full Stack Developer
- **Lin ZHANG** - Full Stack Developer
- **Wangying LIU** - Full Stack Developer

## 📞 Contact

- **GitHub**: [https://github.com/ikaihc/RecipePlanner](https://github.com/ikaihc/RecipePlanner)
- **Email**: team@recipeplanner.com

## 🙏 Acknowledgments

- [Laravel](https://laravel.com) - The PHP framework for web artisans
- [React](https://reactjs.org) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework
- [Vite](https://vitejs.dev) - Next Generation Frontend Tooling

---

**Enjoy the joy of cooking!** 🍳✨

Made with ❤️ by the RecipePlanner Team
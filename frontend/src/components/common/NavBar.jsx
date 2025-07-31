import React, { useState } from 'react'
import { IoIosMenu, IoIosClose } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const navItems = [
    { label: 'All Recipes', path: '/' },
    { label: 'My Recipes', path: '/my-recipes' },
    { label: 'Favorites', path: '/favorites' },
    { label: 'Upload', path: '/upload' },
    { label: 'My Shopping List', path: '/my-shopping-list' },
    { label: 'Meals of the Week', path: '/meals-of-the-week' },
   // { label: 'Login', path: '/login' },
   // { label: 'Register', path: '/register' },
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
     const { isLoggedIn, logout } = useAuth(); // ✅ 正确地放在函数组件中


    const toggleMenu = () => setIsOpen(!isOpen)

    const authItems = isLoggedIn
   // ? [{ label: 'Logout', path: '#', onClick: logout }]
   // ? [{ label: 'Logout', path: '/', onClick: () => logout() }]
    ? [{
      label: 'Logout',
      path: '/',
      onClick: (e) => {
        e.preventDefault(); // 防止立即跳转
        logout();           // 执行登出
      }
    }]

    : [
        { label: 'Login', path: '/login' },
        { label: 'Register', path: '/register' },
      ]

   const renderLink = (item, index, isMobile = false) => {
        const commonClass = isMobile
            ? 'block px-4 py-2'
            : ''
        const activeClass = isMobile
            ? 'text-indigo-600 bg-indigo-50 font-bold'
            : 'text-indigo-600 font-bold'
        const defaultClass = isMobile
            ? 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium'
            : 'text-gray-700 hover:text-indigo-600 font-medium'

        if (item.onClick) {
            return (
                <NavLink
                key={index}
                to={item.path}
                onClick={(e) => {
                    item.onClick(e)
                    if (isMobile) setIsOpen(false)
                }}
                className={({ isActive }) =>
                    `${isMobile ? 'block px-4 py-2' : ''} ${
                    isActive
                        ? (isMobile
                            ? 'text-indigo-600 bg-indigo-50 font-bold'
                            : 'text-indigo-600 font-bold')
                        : (isMobile
                            ? 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium'
                            : 'text-gray-700 hover:text-indigo-600 font-medium')
                    }`
                }
                >
                {item.label}
                </NavLink>
            )
            }

        return (
            <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                    `${commonClass} ${
                        isActive ? activeClass : defaultClass
                    }`
                }
                onClick={() => isMobile && setIsOpen(false)}
            >
                {item.label}
            </NavLink>
        )
    }

    return (
        <nav className="bg-white shadow-md fixed w-full z-10 top-0 left-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center text-xl font-bold text-indigo-600">
                        🍳 MealPlanner
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navItems.map((item, index) => renderLink(item, index))}
                        {authItems.map((item, index) => renderLink(item, `auth-${index}`))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button onClick={toggleMenu} className="text-gray-700 hover:text-indigo-600">
                            {isOpen ? <IoIosClose size={28} /> : <IoIosMenu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    {navItems.map((item, index) => renderLink(item, index, true))}
                    {authItems.map((item, index) => renderLink(item, `auth-${index}`, true))}
                </div>
            )}
        </nav>
    )
}

export default Navbar

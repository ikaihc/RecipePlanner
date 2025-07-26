import React, { useState } from 'react'
import { IoIosMenu, IoIosClose } from 'react-icons/io'

const navItems = [
    {label:'All Recipes',path:'/all-recipes'},
    {label:'Favourites',path:'/favorites'},
    {label:'Upload',path:'/upload'},
    {label:'My Shopping List',path:'my-shopping-list'},
    {label:'Meals of the Week',path:'/meals-of-the-week'},
    {label:'Login',path:'/login'},
    {label:'Register',path:'/register'},]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <nav className="bg-white shadow-md fixed w-full z-10 top-0 left-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */ }
                    <div className="flex-shrink-0 flex items-center text-xl font-bold text-indigo-600">
                        🍳 MealPlanner
                    </div>

                    {/* Desktop Menu */ }
                    <div className="hidden md:flex space-x-8 items-center">
                        { navItems.map((item, index) => (
                            <a key={ index } href={item.path} className="text-gray-700 hover:text-indigo-600 font-medium">
                                { item.label }
                            </a>
                        )) }
                    </div>

                    {/* Mobile menu button */ }
                    <div className="flex items-center md:hidden">
                        <button onClick={ toggleMenu }
                                className="text-gray-700 hover:text-indigo-600 ">
                            { isOpen ? <IoIosClose size={ 28 }/> : <IoIosMenu size={ 28 }/> }
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */ }
            { isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    { navItems.map((item, index) => (
                        <a key={ index } href={item.path}
                           className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                            { item.label }
                        </a>
                    )) }
                </div>
            ) }
        </nav>
    )
}

export default Navbar

import React from 'react'
import NavBar from './NavBar.jsx'
import { Outlet } from 'react-router-dom'

function Layout () {
    return (
        <div className='flex flex-col h-dvh'>
            <NavBar/>
            <main className='pt-16 bg-gray-50 flex-1 overflow-auto'>
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout
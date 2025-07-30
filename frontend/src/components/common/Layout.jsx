import React from 'react'
import NavBar from './NavBar.jsx'
import { Outlet } from 'react-router-dom'

function Layout () {
    return (
        <>
            <NavBar/>
            <main className='pt-16'>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout
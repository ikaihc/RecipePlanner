import React from 'react'
import NavBar from './NavBar.jsx'

function Layout ({ children }) {
    return (
        <>
            <NavBar/>
            <main className='pt-16'>
                {children}
            </main>
        </>
    )
}

export default Layout
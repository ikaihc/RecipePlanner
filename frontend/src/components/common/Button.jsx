import React from 'react'

function Button ({children,onClick}) {
    return (
        <button
            className="w-full p-2 bg-indigo-500 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
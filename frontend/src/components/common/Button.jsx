import React from 'react'

function Button ({children,...props}) {
    return (
        <button
            className="w-full p-2 bg-indigo-500 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
            { ...props }
        >
            {children}
        </button>
    )
}

export default Button
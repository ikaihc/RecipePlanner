import React from 'react'

function Input (props) {
    const {id, label, error, ...restProps} = {...props}
    return (
        <div>
            <label htmlFor={id} className="block text-gray-700 font-medium">{ label }</label>
            <input {...restProps}
                   className={`w-full mt-1 p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}/>
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    )
}

export default Input
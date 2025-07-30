import React from 'react'

function TexyArea (props) {
    const {id,label} = {...props}
    return (
        <div>
            <label htmlFor={id} className="block text-gray-700 font-medium">{ label }</label>
            <textarea {...props}
                   className="w-full mt-1 p-2 border border-gray-300 rounded-md"/>
        </div>
    )
}

export default TexyArea
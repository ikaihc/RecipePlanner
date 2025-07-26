import React from 'react'
import Button from '../../common/Button.jsx'

function RecipeCard ({ title, description, image_url }) {
    return (
        <div
            className="w-full max-w-xs bg-white border border-gray-200 rounded-sm shadow hover:shadow-xl transition-shadow duration-200">
            <img
                src={ image_url }
                alt={ title || 'Recipe image' }
                className="w-full h-48 object-cover rounded-t-sm"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 text-center truncate">
                    { title }
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    { description }
                </p>
            </div>
            <div className="p-4">
                <Button>View Detail</Button>
            </div>
        </div>
    )
}

export default RecipeCard

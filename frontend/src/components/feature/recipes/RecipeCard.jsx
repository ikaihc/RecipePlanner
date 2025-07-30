import React from 'react'
import Button from '../../common/Button.jsx'
import { Link } from 'react-router'
import { useRecipesDispatch } from '../../../contexts/RecipeContext.jsx'

function RecipeCard ({ id,title, description, image_url ,edit}) {
    const dispatch = useRecipesDispatch()
    const handleDeleteRecipe = ()=> {
        alert('Please confirm to delete the recipe')
        dispatch({type:'delete_recipe',payload:{id}})
    }
    return (
        <div
            className="flex flex-col justify-between w-full max-w-xs bg-white border border-gray-200 rounded-sm shadow hover:shadow-xl transition-shadow duration-200">
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
            <div className={ `p-4 ${edit ? 'flex gap-2' : ''}` }>
                <Link to={ `/${ id }/detail` } className='flex-1'>
                    <Button>View Detail</Button>
                </Link>
                {edit &&  <Link to={ `/${ id }/update-recipe` } className='flex-1'>
                    <Button>Update</Button>
                </Link>}
                <div className='flex-1'>
                    { edit && <Button onClick={handleDeleteRecipe}>Delete</Button> }
                </div>

            </div>
        </div>
    )
}

export default RecipeCard

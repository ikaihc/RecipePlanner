import React, { useEffect, useState } from 'react'
import Button from '../../common/Button.jsx'
import { Link } from 'react-router'
import { useRecipes } from '../../../contexts/RecipeContext.jsx'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'

function RecipeCard ({ id, title, description, image_url, edit, page }) {
    const { deleteRecipe, loadRecipes, loadUserRecipes, loadFavorites, toggleFavorite } = useRecipes()
    const [isFavorite, setIsFavorite] = useState()
    // after delete recipes, refetch all recipes and user recipes
    const handleDeleteRecipe = async() => {
        alert('Please confirm to delete the recipe')
        await deleteRecipe(id)
        await loadRecipes()
        await loadUserRecipes()
    }

    useEffect(() => {
        ( async function () {

            const favs = await loadFavorites()
            const isFav = favs?.some(fav => fav.id === id)
            setIsFavorite(isFav)
        } )()
    }, [id, loadFavorites])

    const handleToggleFavorites = async() => {

        await toggleFavorite(id)
        const updatedFavorites = await loadFavorites()

        const isFav = updatedFavorites?.some(fav => fav.id === id)
        setIsFavorite(isFav)
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
                <div className="flex justify-between ">
                    <h3 className="text-lg font-semibold text-gray-800 text-center truncate">
                        { title }
                    </h3>

                    { page === 'favorites' && ( <div className="cursor-pointer" onClick={ handleToggleFavorites }>
                        { isFavorite ? <IoIosHeart size={ 24 } color="red"/> : <IoIosHeartEmpty size={ 24 }/> }
                    </div> ) }


                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    { description }
                </p>
            </div>
            <div className={ `p-4 ${ edit ? 'flex gap-2' : '' }` }>
                <Link to={ `/${ id }/detail` } className="flex-1">
                    <Button>View Detail</Button>
                </Link>
                { edit && <Link to={ `/${ id }/update-recipe` } className="flex-1">
                    <Button>Update</Button>
                </Link> }
                <div className="flex-1">
                    { edit && <Button onClick={ handleDeleteRecipe }>Delete</Button> }
                </div>

            </div>
        </div>
    )
}

export default RecipeCard

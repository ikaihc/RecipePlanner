import React, { useEffect } from 'react'
import RecipeCard from '../components/feature/recipes/RecipeCard.jsx'
import { useRecipes } from '../contexts/RecipeContext.jsx'
import { useNavigate } from 'react-router-dom'

function AllRecipes () {
    const { favorites } = useRecipes()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (token==='') {
            navigate('login')
        }
    }, [])

    return (
        <>
            <h1 className="text-4xl font-semibold text-gray-800 my-5 text-center">Favourites</h1>
            <div className="flex flex-wrap gap-10 p-10 justify-center">
                { favorites.length > 0 ? favorites.map((recipe, idx) => (
                    <RecipeCard key={ idx } { ...recipe } page='favorites'/>
                )) : <h2 className="text-3xl text-indigo-500 font-semibold text-center p-10">No favourites added yet</h2> }
            </div>

        </>
    )
}

export default AllRecipes
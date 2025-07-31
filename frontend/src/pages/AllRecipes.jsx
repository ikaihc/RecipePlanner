import React, { useEffect } from 'react'
import RecipeCard from '../components/feature/recipes/RecipeCard.jsx'
import { useRecipes } from '../contexts/RecipeContext.jsx'

function AllRecipes () {
    const { allRecipes } = useRecipes()

    return (
        <>
            <h1 className="text-4xl font-semibold text-gray-800 my-5 text-center">All Recipes</h1>
            <div className="flex flex-wrap gap-10 p-10 justify-center">
                { Array.isArray(allRecipes) && allRecipes.map((recipe, idx) => (
                    <RecipeCard key={ idx } { ...recipe }/>
                )) }
            </div>

        </>
    )
}

export default AllRecipes
import React from 'react'
import Layout from '../components/common/Layout.jsx'
import RecipeCard from '../components/feature/recipes/RecipeCard.jsx'
import { useRecipes } from '../contexts/RecipeContext.jsx'

function AllRecipes (props) {
    const { favourites } = useRecipes()
    return (
        <Layout>
            <h1 className="text-4xl font-semibold text-gray-800 my-5 text-center">Favourites</h1>
            <div className="flex flex-wrap gap-10 p-10 justify-center">
                { favourites.length > 0 ? favourites.map((recipe, idx) => (
                    <RecipeCard key={ idx } { ...recipe }/>
                )) : <h2 className="text-3xl text-indigo-500 font-semibold text-center p-10">No favourites added yet</h2> }
            </div>

        </Layout>
    )
}

export default AllRecipes
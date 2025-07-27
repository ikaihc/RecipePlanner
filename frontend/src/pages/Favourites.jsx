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
                { favourites.map((recipe, idx) => (
                    <RecipeCard key={ idx } { ...recipe }/>
                )) }
            </div>

        </Layout>
    )
}

export default AllRecipes
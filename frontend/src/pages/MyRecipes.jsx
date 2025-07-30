import React from 'react'
import Layout from '../components/common/Layout.jsx'
import RecipeCard from '../components/feature/recipes/RecipeCard.jsx'
import { useRecipes } from '../contexts/RecipeContext.jsx'

function AllRecipes (props) {
    const { allRecipes } = useRecipes()
    const authUser = {
        user_id:123,
        username:'Jame Smith'
    }
    const myRecipes = allRecipes.filter(recipe=>recipe.user_id===authUser.user_id)

    return (
        <Layout>
            <h1 className="text-4xl font-semibold text-gray-800 my-5 text-center">My Recipes</h1>
            <div className="flex flex-wrap gap-10 p-10 justify-center">
                { myRecipes.map((recipe, idx) => (
                    <RecipeCard key={ idx } { ...recipe } edit={true}/>
                )) }
            </div>

        </Layout>
    )
}

export default AllRecipes
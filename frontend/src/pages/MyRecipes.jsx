import React, { useEffect } from 'react'
import RecipeCard from '../components/feature/recipes/RecipeCard.jsx'
import { useRecipes } from '../contexts/RecipeContext.jsx'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button.jsx'

function AllRecipes () {
    const { userRecipes, loadUserRecipes } = useRecipes()
    const navigate = useNavigate()

    // auth user after login (plan to get from authUser context)
    const authUser = {
        user_id: 11,
        username: 'Jame Smith',
    }

    // initially get all recipes created by auth user
    useEffect(() => {
        loadUserRecipes(authUser.user_id)
    }, [authUser.user_id])


    return (
        <>
            <h1 className="text-4xl font-semibold text-gray-800 my-5 text-center">My Recipes</h1>
            <div className="flex flex-wrap gap-10 p-10 justify-center">
                { userRecipes.length > 0
                    ? userRecipes.map((recipe, idx) => (
                        <RecipeCard key={ idx } { ...recipe } edit={ true }/>
                    )) : (
                        <div>
                            <h3 className="mb-6">You haven't created any recipes.</h3>
                            <Button onClick={ () => navigate('/upload') }>Go to create</Button>
                        </div> ) }
            </div>

        </>
    )
}

export default AllRecipes
import React, { useEffect } from 'react'
import RecipeCard from '../components/feature/recipes/RecipeCard.jsx'
import { useRecipes } from '../contexts/RecipeContext.jsx'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import { useAuth } from '../components/auth/AuthContext.jsx'

function AllRecipes () {
    const { userRecipes } = useRecipes()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token ==='') {
            navigate('login')
        }
    }, [])



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
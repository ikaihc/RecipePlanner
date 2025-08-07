import { useNavigate, useParams } from 'react-router-dom'
import { useRecipes } from '../contexts/RecipeContext.jsx'
import RecipeForm from '../components/feature/recipes/RecipeForm.jsx'
import React, { useEffect, useState } from 'react'

const UpdateRecipe = () => {
    const { recipeId } = useParams()
    const { updateRecipe, getRecipeById, loadRecipes, ingredients, createIngredient,uploadImage ,loadUserRecipes} = useRecipes()
    const navigate = useNavigate()
    const [existingRecipe, setExistingRecipe] = useState(null)
    const token = localStorage.getItem('token')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async function(){

        try {
            const recipe = await getRecipeById(recipeId)
            setExistingRecipe(recipe)
        } catch (error) {
            console.error("Failed to load recipe:", error)
        } finally {
            setIsLoading(false)
        }
    })()

        if (!token) {
            navigate('login')
        }

    }, [])

    const handleSubmit = async(formData) => {
        const updatedIngredients = []

        for (let item of formData.ingredients) {
            const existing = ingredients.find(i => i.name.toLowerCase() === item.name.toLowerCase())
            let ingredientId

            if (existing) {
                ingredientId = existing.id
            } else {
                // Create the new ingredient
                const newIngredient = await createIngredient( { name: item.name })
                ingredientId = newIngredient.id

                // Update context list
                // await loadIngredients() // refresh ingredients
            }
            updatedIngredients.push({
                id: ingredientId,
                amount: item.amount,
            })
        }

        let image_url = formData.image_url

        if (typeof(formData.image_url) !== 'string') {
            const result = await uploadImage({image: formData.image_url })
            if (result.statusText === 'OK') {
                image_url = result.data.url
            }
        }

        await updateRecipe(recipeId,{ ...formData, ingredients: updatedIngredients ,image_url:image_url})
        await loadRecipes()
        await loadUserRecipes()
        alert('Recipe updated successfully!')
        navigate(`/${ existingRecipe.id }/detail`)
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-dvh">
                <div className="w-12 h-12 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }


    if (!existingRecipe) {
        return (
            <>
                <div className="text-center py-16 text-xl text-indigo-500">Recipe not found.</div>
            </>
        )
    }

    return (
        <>
            <div className="max-w-3xl mx-auto p-8 mt-12 bg-white border border-gray-100 shadow-md rounded-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Update Recipe</h2>
                <RecipeForm onSubmit={ handleSubmit } initialValues={ existingRecipe } submitButtonLabel="Update"
                            isEdit={ true }/>
            </div>
        </>
    )
}

export default UpdateRecipe

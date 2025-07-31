import { useRecipes } from '../contexts/RecipeContext.jsx'
import { useNavigate } from 'react-router-dom'
import RecipeForm from '../components/feature/recipes/RecipeForm.jsx'
import { useEffect } from 'react'

const CreateRecipe = () => {
    const { createRecipe, ingredients,loadUserRecipes, loadIngredients, createIngredient,uploadImage } = useRecipes()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate('login')
        }
    }, [])


    // pass this function to recipe form to create new recipe
    const handleSubmit = async(formData) => {
        const updatedIngredients = []

        for (let item of formData.ingredients) {
            const existing = ingredients.find(i => i.name.toLowerCase() === item.name.toLowerCase())

            let ingredientId

            if (existing) {
                ingredientId = existing.id
            } else {
                // Create the new ingredient
                const newIngredient = await createIngredient({ name: item.name })
                ingredientId = newIngredient.id

                // Update context list
                loadIngredients() // refresh
            }
            updatedIngredients.push({
                id: ingredientId,
                amount: item.amount,
            })
        }

        let image_url = ''
        const result = await uploadImage({image: formData.image_url })
        if (result.statusText === 'OK') {
            image_url = result.data.url
        }


        // call createRecipe function to send request to backend
        const recipe_result = await createRecipe({
          ...formData,
            ingredients: updatedIngredients,
            image_url:image_url
        });

        console.log(recipe_result)

        await loadUserRecipes()

        if (result.statusText === 'Created') {
            alert('Recipe uploaded successfully!')
        }

        // refetch all public recipes after creating new recipe

        navigate('/')
    }

    return (
        <>
            <div className="max-w-3xl mx-auto p-8 mt-12 bg-white border border-gray-100 shadow-md rounded-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Upload New Recipe</h2>
                <RecipeForm onSubmit={ handleSubmit } isEdit={ false }/>
            </div>
        </>
    )
}

export default CreateRecipe

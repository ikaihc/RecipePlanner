import { useRecipes } from '../contexts/RecipeContext.jsx'
import { useNavigate } from 'react-router-dom'
import RecipeForm from '../components/feature/recipes/RecipeForm.jsx'

const CreateRecipe = () => {
    const { createRecipe, ingredients,loadRecipes, loadIngredients, createIngredient } = useRecipes()
    const navigate = useNavigate()

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

        // call createRecipe function to send request to backend
        await createRecipe({
          ...formData,
            ingredients: updatedIngredients,
        });

        // refetch all public recipes after creating new recipe
        await loadRecipes()
        alert('Recipe uploaded successfully!')
        navigate('/all-recipes')
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

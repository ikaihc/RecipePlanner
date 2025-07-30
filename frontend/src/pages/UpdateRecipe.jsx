import { useNavigate, useParams } from 'react-router-dom'
import { useRecipes, useRecipesDispatch } from '../contexts/RecipeContext.jsx'
import RecipeForm from '../components/feature/recipes/RecipeForm.jsx'

const UpdateRecipe = () => {
    const { recipeId } = useParams()
    const { allRecipes } = useRecipes()
    const dispatch = useRecipesDispatch()
    const navigate = useNavigate()

    const existingRecipe = allRecipes.find(r => r.id === Number(recipeId))

    const handleSubmit = (formData) => {
        const updatedRecipe = {
            ...formData,
            id: existingRecipe.id, // Important to retain the original ID
            user_id: existingRecipe.user_id,
        }

        dispatch({ type: 'update_recipe', payload: updatedRecipe })
        alert('Recipe updated successfully!')
        navigate( `/${ existingRecipe.id }/detail` )
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
               <RecipeForm onSubmit={handleSubmit} initialValues={existingRecipe} submitButtonLabel='Update' isEdit={true}/>
            </div>
        </>
    )
}

export default UpdateRecipe

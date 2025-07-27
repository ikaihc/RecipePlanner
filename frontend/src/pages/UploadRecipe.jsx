import React, { useState } from 'react'
import Layout from '../components/common/Layout.jsx'
import { useRecipesDispatch } from '../contexts/RecipeContext.jsx'
import { useNavigate } from 'react-router-dom'

const UploadRecipe = () => {
    const dispatch = useRecipesDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        ingredients: [''],
        instructions: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...formData.ingredients]
        updatedIngredients[index] = value
        setFormData(prev => ({ ...prev, ingredients: updatedIngredients }))
    }

    const addIngredientField = () => {
        setFormData(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, ''],
        }))
    }

    const removeIngredientField = (index) => {
        const updatedIngredients = formData.ingredients.filter((_, i) => i !== index)
        setFormData(prev => ({ ...prev, ingredients: updatedIngredients }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newRecipe = {
            ...formData,
            id: Date.now(), // Unique ID for simplicity
        }

        dispatch({ type: 'create_recipe', payload: newRecipe })
        alert('Recipe uploaded successfully!')
        navigate('/all-recipes')
    }

    return (
        <Layout>
            <div className="max-w-3xl mx-auto p-8 mt-12 bg-white shadow-md rounded-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Upload New Recipe</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            rows="3"
                        />
                    </div>

                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const imageUrl = URL.createObjectURL(file);
                                    setFormData(prev => ({ ...prev, image_url: imageUrl }));
                                }
                            }}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            required
                        />

                        {formData.image_url && (
                            <img
                                src={formData.image_url}
                                alt="Preview"
                                className="mt-2 max-h-48 rounded-md object-cover"
                            />
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Ingredients</label>
                        {formData.ingredients.map((ingredient, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded-md"
                                    required
                                />
                                {formData.ingredients.length > 1 && (
                                    <button type="button" onClick={() => removeIngredientField(index)}
                                            className="text-red-500 font-bold">✕</button>
                                )}
                            </div>
                        ))}
                        <button type="button"
                                onClick={addIngredientField}
                                className="text-indigo-600 mt-1 text-sm hover:underline">
                            + Add Ingredient
                        </button>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Instructions</label>
                        <textarea
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            rows="5"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
                    >
                        Submit Recipe
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default UploadRecipe

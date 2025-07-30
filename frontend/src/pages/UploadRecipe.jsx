import React, { useEffect, useState } from 'react'
import Layout from '../components/common/Layout.jsx'
import { useRecipesDispatch } from '../contexts/RecipeContext.jsx'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import Input from '../components/feature/recipes/Input.jsx'
import TextArea from '../components/feature/recipes/TextArea.jsx'
import RecipeForm from '../components/feature/recipes/RecipeForm.jsx'

const UploadRecipe = () => {
    const dispatch = useRecipesDispatch()
    const navigate = useNavigate()

    const handleSubmit = (formData) => {
        const newRecipe = {
            ...formData,
            user_id: 123,
            id: Date.now(), // Unique ID for simplicity
        }

        dispatch({ type: 'create_recipe', payload: newRecipe })
        alert('Recipe uploaded successfully!')
        navigate('/all-recipes')
    }

    return (
        <Layout>
            <div className="max-w-3xl mx-auto p-8 mt-12 bg-white border border-gray-100 shadow-md rounded-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Upload New Recipe</h2>
                <RecipeForm onSubmit={ handleSubmit } isEdit={ false }/>
            </div>
        </Layout>
    )
}

export default UploadRecipe

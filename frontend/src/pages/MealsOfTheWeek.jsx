import React, { useState, useEffect, useCallback } from 'react'
import { IoAdd, IoTrash, IoCalendar } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

const MealsOfTheWeek = () => {
    const navigate = useNavigate()
    const [mealPlans, setMealPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [recipes, setRecipes] = useState([])
    const [formData, setFormData] = useState({
        day_of_week: 'Monday',
        meal_type: 'breakfast',
        recipe_id: ''
    })

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const mealTypes = ['breakfast', 'lunch', 'dinner']

    const fetchMealPlans = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/meal-plans')
            setMealPlans(response.data)
            setError(null)
        } catch (err) {
            if (err.message.includes('401') || err.message.includes('Unauthorized')) {
                navigate('/login')
                return
            }
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [navigate])

    const fetchRecipes = async () => {
        try {
            const response = await api.get('/recipes')
            setRecipes(response.data)
        } catch (err) {
            console.error('Failed to fetch recipes:', err)
        }
    }

    const addMealPlan = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post('/meal-plans', formData)
            // Add the new meal plan to the state
            setMealPlans(prev => [...prev, response.data])
            setShowAddForm(false)
            setFormData({
                day_of_week: 'Monday',
                meal_type: 'breakfast',
                recipe_id: ''
            })
            setError(null) // Clear any previous errors
        } catch (err) {
            if (err.message.includes('401') || err.message.includes('Unauthorized')) {
                navigate('/login')
                return
            }
            setError(err.message)
        }
    }

    const removeMealPlan = async (id) => {
        try {
            await api.delete(`/meal-plans/${id}`)
            setMealPlans(prev => prev.filter(plan => plan.id !== id))
        } catch (err) {
            if (err.message.includes('401') || err.message.includes('Unauthorized')) {
                navigate('/login')
                return
            }
            setError(err.message)
        }
    }

    const clearAllMealPlans = async () => {
        try {
            await api.delete('/meal-plans/clear')
            setMealPlans([])
        } catch (err) {
            if (err.message.includes('401') || err.message.includes('Unauthorized')) {
                navigate('/login')
                return
            }
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchMealPlans()
        fetchRecipes()
    }, [fetchMealPlans])

    const getMealPlansForDayAndType = (day, mealType) => {
        return mealPlans.filter(plan => 
            plan.day_of_week === day && plan.meal_type === mealType
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 mt-12">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-12">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Meals of the Week</h1>
                        <div className="flex gap-3">
                            {mealPlans.length > 0 && (
                                <button
                                    onClick={clearAllMealPlans}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Clear All
                                </button>
                            )}
                            <button
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <IoAdd size={20} />
                                Add Meal
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {/* Add Meal Form */}
                    {showAddForm && (
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-4">Add New Meal</h3>
                            <form onSubmit={addMealPlan} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Day of Week
                                        </label>
                                        <select
                                            value={formData.day_of_week}
                                            onChange={(e) => setFormData(prev => ({ ...prev, day_of_week: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            {daysOfWeek.map(day => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Meal Type
                                        </label>
                                        <select
                                            value={formData.meal_type}
                                            onChange={(e) => setFormData(prev => ({ ...prev, meal_type: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            {mealTypes.map(type => (
                                                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Recipe
                                        </label>
                                        <select
                                            value={formData.recipe_id}
                                            onChange={(e) => setFormData(prev => ({ ...prev, recipe_id: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        >
                                            <option value="">Select a recipe</option>
                                            {recipes.map(recipe => (
                                                <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Add Meal
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Meal Plan Grid */}
                    {mealPlans.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">📅</div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No meals planned yet</h3>
                            <p className="text-gray-500">Add meals to plan your week!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Day</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Breakfast</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Lunch</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Dinner</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {daysOfWeek.map(day => (
                                        <tr key={day} className="border-b border-gray-100">
                                            <td className="py-4 px-4 font-medium text-gray-900">{day}</td>
                                            {mealTypes.map(mealType => {
                                                const mealPlans = getMealPlansForDayAndType(day, mealType)
                                                return (
                                                    <td key={mealType} className="py-4 px-4">
                                                        {mealPlans.length > 0 ? (
                                                            <div className="space-y-2">
                                                                {mealPlans.map((mealPlan) => (
                                                                    <div key={mealPlan.id} className="flex items-center justify-between bg-indigo-50 rounded-lg p-2">
                                                                        <span className="font-medium text-indigo-900 text-sm">
                                                                            {mealPlan.recipe?.title || 'Unknown Recipe'}
                                                                        </span>
                                                                        <button
                                                                            onClick={() => removeMealPlan(mealPlan.id)}
                                                                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                                                                            title="Remove meal"
                                                                        >
                                                                            <IoTrash size={14} />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="text-gray-400 text-sm">-</div>
                                                        )}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MealsOfTheWeek 
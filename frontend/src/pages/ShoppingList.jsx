import React, { useState, useEffect } from 'react'
import { IoTrash, IoTrashOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

const ShoppingList = () => {
    const navigate = useNavigate()
    const [shoppingList, setShoppingList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchShoppingList = async () => {
        try {
            setLoading(true)
            const response = await api.get('/shopping-list')
            setShoppingList(response.data)
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
    }

    const removeItem = async (ingredientId) => {
        try {
            await api.post('/shopping-list/toggle', { ingredient_id: ingredientId })
            setShoppingList(prev => prev.filter(item => item.ingredient_id !== ingredientId))
        } catch (err) {
            if (err.message.includes('401') || err.message.includes('Unauthorized')) {
                navigate('/login')
                return
            }
            setError(err.message)
        }
    }

    const clearAll = async () => {
        try {
            await api.delete('/shopping-list/clear')
            setShoppingList([])
        } catch (err) {
            if (err.message.includes('401') || err.message.includes('Unauthorized')) {
                navigate('/login')
                return
            }
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchShoppingList()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 mt-12">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-12">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">My Shopping List</h1>
                        {shoppingList.length > 0 && (
                            <button
                                onClick={clearAll}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <IoTrashOutline size={20} />
                                Clear All
                            </button>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {shoppingList.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">🛒</div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">Your shopping list is empty</h3>
                            <p className="text-gray-500">Add ingredients from recipes to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {shoppingList.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                                        <span className="text-lg font-medium text-gray-900">
                                            {item.ingredient?.name || 'Unknown Ingredient'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.ingredient_id)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                                        title="Remove from shopping list"
                                    >
                                        <IoTrash size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShoppingList 
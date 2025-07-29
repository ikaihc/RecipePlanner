import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/common/Layout.jsx'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import Button from '../components/common/Button.jsx'
import { useRecipes, useRecipesDispatch } from '../contexts/RecipeContext.jsx'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const mealTypes = ['Breakfast', 'Lunch', 'Dinner']

function RecipeDetail () {
    const { recipes, favourites } = useRecipes()
    const dispatch = useRecipesDispatch()
    const { recipeId } = useParams()

    const curRecipe = recipes.find(recipe => recipe.id === Number(recipeId))
    const isFavourite = favourites.some(fav => fav.id === curRecipe?.id)
    const [mealPlanSelections, setMealPlanSelections] = useState({})
    const [mealPlans, setMealPlans] = useState([])

    useEffect(() => {
        console.log('mealSelections', mealPlanSelections)
    }, [mealPlanSelections])

    useEffect(() => {
        console.log('mealPlans', mealPlans)
    }, [mealPlans])

    useEffect(() => {
        console.log('favourites', favourites)
    }, [favourites])

    const handleToggleFavourites = () => {
        if (!curRecipe) return

        if (isFavourite) {
            dispatch({ type: 'remove_from_favourites', payload: curRecipe })
        } else {
            dispatch({ type: 'add_to_favourites', payload: curRecipe })
        }

    }

    const handleCheckboxChange = (day, meal) => {
        setMealPlanSelections(prev => {
            const current = prev[ day ] || []
            const updated = current.includes(meal)
                ? current.filter(m => m !== meal)
                : [...current, meal]
            return {
                ...prev,
                [ day ]: updated,
            }
        })
    }

    const handleAddToMealPlan = () => {
        if (Object.keys(mealPlanSelections).length === 0) alert(
            'Please select at least one meal to add to your meal plan!')

        setMealPlans(prev => {
            const newItems = []

            for (const [day, meals] of Object.entries(mealPlanSelections)) {
                meals.forEach(meal => {
                    const exists = prev.some(
                        item =>
                            item.date === day &&
                            item.meal_type === meal &&
                            item.recipe.id === curRecipe.id,
                    )
                    if (!exists) {
                        newItems.push({
                            date: day,
                            meal_type: meal,
                            recipe: curRecipe,
                        })
                    }
                })
            }
            return [...prev, ...newItems]
        })

        setMealPlanSelections({})
    }
    if (!curRecipe) {
        return (
            <Layout>
                <div className="p-16 text-center text-indigo-500 text-3xl font-semibold">
                    Recipe not found.
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <h1 className="text-4xl font-semibold text-gray-800 my-5 text-center">Recipe Detail { recipeId }</h1>
            <div className="grid grid-cols-1 md:grid-cols-8 gap-10 p-6 sm:p-16 justify-items-center">
                {/* Image */ }
                <div className="col-span-3">
                    <div className='h-80 w-80'>
                        <img
                            src={ curRecipe.image_url }
                            alt={ curRecipe.title }
                            className="w-full h-full rounded-md shadow-md object-cover"
                        />
                    </div>

                    <div className="flex my-4 cursor-pointer" onClick={ handleToggleFavourites }>
                        { isFavourite ? <IoIosHeart size={ 24 } color="red"/> : <IoIosHeartEmpty size={ 24 }/> }
                        <span>{isFavourite ? "Remove from Favourites" : "Add to Favourites" }</span>
                    </div>


                    <div className="bg-indigo-50 p-4 rounded-md mt-2">
                        <h4 className="text-xl font-semibold mb-2 text-gray-700">Add to Meal of the Week:</h4>
                        <div className="space-y-4 max-h-56 overflow-y-auto">
                            { daysOfWeek.map(day => (
                                <div key={ day }>
                                    <p className="text-indigo-700 font-medium">{ day }</p>
                                    <div className="flex gap-4 flex-wrap">
                                        { mealTypes.map(meal => (
                                            <label key={ meal }
                                                   className="flex items-center gap-1 text-gray-800 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={ mealPlanSelections[ day ]?.includes(meal) || false }
                                                    onChange={ () => handleCheckboxChange(day, meal) }
                                                    className="accent-indigo-500"
                                                />
                                                { meal }
                                            </label>
                                        )) }
                                    </div>
                                </div>
                            )) }
                        </div>


                        <button
                            className="w-full p-2 mt-3 bg-indigo-500 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                            onClick={ handleAddToMealPlan }
                        >
                            Add to Meal Plan
                        </button>
                    </div>
                </div>

                {/* Details */ }
                <div className="col-span-5 flex flex-col justify-start gap-6 w-full">
                    {/* Title */ }
                    <h2 className="text-3xl font-bold text-indigo-700">{ curRecipe.title }</h2>

                    {/* Description */ }
                    { curRecipe.description && (
                        <p className="text-gray-600 leading-relaxed">{ curRecipe.description }</p>
                    ) }

                    {/* Ingredients */ }
                    <div className="bg-indigo-50 p-4 rounded-md">
                        <h3 className="text-2xl font-semibold text-indigo-600 mb-2">Ingredients</h3>
                        <ul className="list-disc list-inside text-gray-800 space-y-1">
                            { Array.isArray(curRecipe.ingredients) ? (curRecipe.ingredients.map((ingredient, idx) => (
                                <li key={ idx }>{ ingredient.name}  {ingredient.quantity}</li>
                            ))) : ( <li>No ingredients available.</li> ) }
                        </ul>
                    </div>

                    {/* Instructions */ }
                    <div>
                        <h3 className="text-2xl font-semibold text-indigo-600 mb-2">Instructions</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            { curRecipe.instructions }
                        </p>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default RecipeDetail
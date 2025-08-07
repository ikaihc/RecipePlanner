import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { IoCartOutline } from 'react-icons/io5'
import { useRecipes } from '../contexts/RecipeContext.jsx'
import { useMealPlan } from '../contexts/MealPlanContext.jsx'
import api from '../api/api'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const mealTypes = ['Breakfast', 'Lunch', 'Dinner']

function RecipeDetail () {
    const { getRecipeById, toggleFavorite, favorites, loadFavorites} = useRecipes()
    const { mealPlans, loadMealPlans, addToMealPlans } = useMealPlan()

    const [isLoading, setIsLoading] = useState(true)

    const { recipeId } = useParams()
    const [curRecipe, setCurRecipe] = useState()

    const [isFavorite, setIsFavorite] = useState()
    const [mealPlanSelections, setMealPlanSelections] = useState({})
    const [addingToShoppingList, setAddingToShoppingList] = useState(false)

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        ( async function () {
            await loadMealPlans()
        } )()
    }, [])

    useEffect(() => {
        (async function () {
            try {
                const recipe = await getRecipeById(recipeId)
                setCurRecipe(recipe)

                const favs = await loadFavorites()
                const isFav = favs?.some(fav => fav.id === recipe.id)
                setIsFavorite(isFav)
            } catch (error) {
                console.error("Failed to load recipe:", error)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    // This is for test
    useEffect(() => {
        console.log({ mealPlanSelections, mealPlans, isFavorite, favorites })
    }, [mealPlanSelections, isFavorite, favorites])

    const handleToggleFavorites = async() => {
        if (!curRecipe) return

        if (!token) {
            navigate('/login')
        }

        await toggleFavorite(recipeId)

        setIsFavorite(prev => !prev);
    }

    // handle meal plan checkbox
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

    // handle add to meal plans
    const handleAddToMealPlan = () => {
        if (Object.keys(mealPlanSelections).length === 0) {
            alert(
                'Please select at least one meal to add to your meal plan!')
            return
        }

        // setMealPlans(prev => {
        const newItems = []

        for (const [day, meals] of Object.entries(mealPlanSelections)) {
            meals.forEach(meal => {
                const exists = mealPlans.some(
                    item =>
                        item.day_of_week === day &&
                        item.meal_type === meal &&
                        item.recipe_id === recipeId,
                )
                if (!exists) {
                    newItems.push({
                        day_of_week: day,
                        meal_type: meal.toLowerCase(),
                        recipe_id: recipeId,
                    })
                }
            })
        }

        newItems.forEach(async(item) => {
            const result = await addToMealPlans(item)
            console.log(result)
        })

        alert('Added to meal plans successfully')
        setMealPlanSelections({})

    }

    // Add all ingredients to shopping list
    const handleAddToShoppingList = async() => {
        if (!token) {
            navigate('/login')
            return
        }

        try {
            setAddingToShoppingList(true)
            await api.post(`/shopping-list/from-recipe/${ recipeId }`)
            alert('Ingredients added to shopping list!')
        }
        catch (error) {
            alert(error.message || 'Failed to add ingredients to shopping list')
        } finally {
            setAddingToShoppingList(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-dvh">
                <div className="w-12 h-12 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }


    if (!curRecipe) {
        return (
            <>
                <div className="p-16 text-center text-indigo-500 text-3xl font-semibold">
                    Recipe not found.
                </div>
            </>
        )
    }

    return (
        <>
            {/* <h1 className="text-4xl font-semibold text-gray-800 my-5 text-center">Recipe Detail { recipeId }</h1> */ }
            <div className="grid grid-cols-1 md:grid-cols-8 gap-10 p-6 sm:p-16 justify-items-center">
                {/* Left */ }
                <div className="col-span-3">
                    <div className="h-80 w-80">
                        <img
                            src={ curRecipe.image_url }
                            alt={ curRecipe.title }
                            className="w-full h-full rounded-md shadow-md object-cover"
                        />
                    </div>

                    <div className="flex my-4 cursor-pointer" onClick={ handleToggleFavorites }>
                        { isFavorite ? <IoIosHeart size={ 24 } color="red"/> : <IoIosHeartEmpty size={ 24 }/> }
                        <span>{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }</span>
                    </div>

                    <button
                        onClick={ handleAddToShoppingList }
                        disabled={ addingToShoppingList }
                        className="w-full p-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2 mb-4"
                    >
                        <IoCartOutline size={ 20 }/>
                        { addingToShoppingList ? 'Adding...' : 'Add Ingredients to Shopping List' }
                    </button>

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

                {/* Right */ }
                <div className="col-span-5 flex flex-col justify-start gap-6 w-full">
                    {/* Title */ }
                    <h2 className="text-3xl font-bold text-indigo-700">{ curRecipe.title }</h2>

                    {/* Description */ }
                    { curRecipe.description && (
                        <p className="text-gray-600 leading-relaxed">{ curRecipe.description }</p>
                    ) }

                    <div className="flex gap-2">
                        <div className="bg-indigo-500 p-1 rounded-lg text-white text-sm">Prepare
                            Time: { curRecipe.prep_time_minutes } mins
                        </div>
                        <div className="bg-indigo-500 p-1 rounded-lg text-white text-sm">Cook
                            Time: { curRecipe.prep_time_minutes } mins
                        </div>
                        <div
                            className="bg-indigo-500 p-1 rounded-lg text-white text-sm">Servings: { curRecipe.servings }</div>
                    </div>

                    {/* Ingredients */ }
                    <div className="bg-indigo-50 p-4 rounded-md">
                        <h3 className="text-2xl font-semibold text-indigo-600 mb-2">Ingredients</h3>
                        <ul className="list-disc list-inside text-gray-800 space-y-1">
                            { Array.isArray(curRecipe.ingredients) ? ( curRecipe.ingredients.map((ingredient, idx) => (
                                <li key={ idx }>{ ingredient.name } { ingredient.amount }</li>
                            )) ) : ( <li>No ingredients available.</li> ) }
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
        </>
    )
}

export default RecipeDetail
import { createContext, useContext, useEffect, useReducer } from 'react'
import api from '../api/api.js'

const RecipesContext = createContext()

const initialState = {
    allRecipes: [],
    favorites: [],
    ingredients: [],
    userRecipes: [],

}

// update react  state based on actions
const recipeReducer = (state, action) => {
    switch (action.type) {
        case 'load_recipes':
            return {
                ...state,
                allRecipes: action.payload,
            }
        case 'create_recipe':
            return {
                ...state,
                allRecipes: [
                    ...state.allRecipes,
                    action.payload,
                ],
            }
        case 'update_recipe':
            return {
                ...state,
                allRecipes: state.allRecipes.map(recipe => recipe.id === action.payload.id ? action.payload : recipe),

            }
        case 'delete_recipe':
            return {
                ...state,
                allRecipes: [...state.allRecipes.filter(recipe => recipe.id !== action.payload)],
            }

        case 'load_favorites':
            return {
                ...state,
                favorites: action.payload,
            }
        case'add_to_favorites':
            return {
                ...state,
                favorites:
                    [
                        ...state.favorites,
                        action.payload,
                    ],
            }
        case 'remove_from_favorites':
            return {
                ...state,
                favorites: state.favorites.filter(recipe => recipe.id !== action.payload.id),
            }
        case 'toggle_favorite':
            if (action.payload.status === 'added') {
                if (state.favorites.some(recipe => recipe.id === action.payload.id)) {
                    return state
                }
                return {
                    ...state,
                    favorites:
                        [
                            ...state.favorites,
                            action.payload,
                        ],
                }

            } else
                if (action.payload.status === 'removed') {
                    return {
                        ...state,
                        favorites: state.favorites.filter(recipe => recipe.id !== action.payload.id),
                    }

                }
            break
        case 'load_ingredients':
            return {
                ...state,
                ingredients: action.payload,
            }
        case 'create_ingredient':
            return {
                ...state,
                ingredients: action.payload,
            }

        case 'load_user_recipes':
            return {
                ...state,
                userRecipes: action.payload,
            }
        default:
            return state
    }

}

export default function RecipesProvider ({ children }) {
    const [state, dispatch] = useReducer(recipeReducer, initialState)

    const actions = {
        // get all public recipes from backend
        loadRecipes: async() => {
            try {
                const result = await api.get('/recipes')
                dispatch({ type: 'load_recipes', payload: result.data })
                console.log(result.data)
            }
            catch (err) {
                console.error('Error loading recipes:', err)
            }
        },

        // create new recipe
        createRecipe: async(newRecipe) => {
            try {
                const result = await api.post('/recipes', newRecipe)
                dispatch({ type: 'create_recipe', payload: result.data })
                console.log(result)
                return result.data
            }
            catch (err) {
                console.error('Error loading recipes:', err)
            }
        },

        // update recipe
        updateRecipe: async(id, updatedRecipe) => {
            const result = await api.put(`/recipes/${ id }`, updatedRecipe)
            dispatch({ type: 'update_recipe', payload: result.data })

        },

        // delete recipe
        deleteRecipe: async(id) => {
            await api.delete(`/recipes/${ id }`)
            dispatch({ type: 'delete_recipe', payload: id })

        },

        // get recipe by id
        getRecipeById: async(id) => {
            const result = await api.get(`/recipes/${ id }`)
            return result.data
        },

        // load all favorites recipes
        loadFavorites: async() => {
            const result = await api.get('/favorites')
            dispatch({ type: 'load_favorites', payload: result.data })
            return result.data
        },

        // add or remove from favorites
        toggleFavorite: async(id) => {
            const result = await api.post('/favorites/toggle', { recipe_id: id })
            dispatch({ type: 'toggle_favorite', payload: result.data })
        },


        // load all ingredients
        loadIngredients: async() => {
            const result = await api.get('/ingredients')
            dispatch({ type: 'load_ingredients', payload: result.data })
        },

        // create new ingredient
        createIngredient: async(newIngredient) => {
            const result = await api.post('/ingredients', newIngredient)
            console.log(result)
            dispatch({ type: 'create_ingredient', payload: result.data })
            return result.data
        },

        //load all recipes created by auth user
        loadUserRecipes: async(user_id) => {
            const result = await api.get(`/users/${ user_id }/recipes`)
            dispatch({ type: 'load_user_recipes', payload: result.data })

        },
    }

    useEffect(() => {
        (async function(){
            // Load ingredients initially
            await actions.loadRecipes()
            await actions.loadIngredients()
            await actions.loadFavorites()
        })()



    }, [])

    const value = {
        ...state,
        ...actions,
    }
    return (
        <RecipesContext.Provider value={ value }>
            { children }
        </RecipesContext.Provider>
    )
}

export const useRecipes = () => {
    return useContext(RecipesContext)
}

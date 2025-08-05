import { createContext, useReducer, useContext } from 'react'
import api from '../api/api.js'

const MealPlanContext = createContext()

const initialState = {
    mealPlans: [],
}

const mealPlanReducer = (state, action) => {
    switch (action.type) {
        case 'load_meal_plans':
            return {
                ...state,
                mealPlans: action.payload,
            }
        case 'add_to_meal_plans':
            return {
                ...state,
                mealPlans: [...state.mealPlans, action.payload],

            }
    }
}

export const MealPlanProvider = ({ children }) => {
    const [state, dispatch] = useReducer(mealPlanReducer, initialState)

    const actions = {
        loadMealPlans: async () => {
            const result = await api.get('/meal-plans')
            dispatch({ type: 'load_meal_plans', payload: result.data })
        },
        addToMealPlans: async (mealPlans) => {
            const result = await api.post('/meal-plans', mealPlans)
            dispatch({ type: 'add_to_meal_plans', payload: result.data })
            return result
        },
    }

    const value = { ...state, ...actions }

    return <MealPlanContext.Provider value={value}>
        {children}
    </MealPlanContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMealPlan() {
    return useContext(MealPlanContext)
}
import './App.css'
import AllRecipes from './pages/AllRecipes.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RecipeDetail from './pages/RecipeDetail.jsx'
import RecipesProvider from './contexts/RecipeContext.jsx'
import Favourites from './pages/Favourites.jsx'
import CreateRecipe from './pages/CreateRecipe.jsx'
import MyRecipes from './pages/MyRecipes.jsx'
import Layout from './components/common/Layout.jsx'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import UpdateRecipe from './pages/UpdateRecipe.jsx'
import { MealPlanProvider } from './contexts/MealPlanContext.jsx'

function App () {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                { index: true, element: <RecipesProvider><AllRecipes/></RecipesProvider> },
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> },
                { path: 'favorites', element: <RecipesProvider><Favourites/></RecipesProvider> },
                { path: 'upload', element: <RecipesProvider><CreateRecipe/></RecipesProvider> },
                { path: ':recipeId/detail', element: <RecipesProvider><MealPlanProvider><RecipeDetail/></MealPlanProvider></RecipesProvider> },
                { path: 'my-recipes', element: <RecipesProvider><MyRecipes/></RecipesProvider> },
                { path: ':recipeId/update-recipe', element: <RecipesProvider><UpdateRecipe/></RecipesProvider> },
            ],
        }])


    return (
        // <RecipesProvider>
            <RouterProvider router={ router }/>
        // </RecipesProvider>

    )
}

export default App

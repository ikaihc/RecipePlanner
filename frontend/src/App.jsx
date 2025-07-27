import './App.css'
import AllRecipes from './pages/AllRecipes.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RecipeDetail from './pages/RecipeDetail.jsx'
import Home from './pages/Home.jsx'
import RecipesProvider from './contexts/RecipeContext.jsx'
import Favourites from './pages/Favourites.jsx'

function App () {
    const router = createBrowserRouter([
        { path: '/', element: <Home/> },
        { path: '/all-recipes', element: <AllRecipes/>, },
        { path: '/favorites', element: <Favourites/>, },
        { path: '/:recipeId/detail', element: <RecipeDetail/> },
    ])

    return (
        <RecipesProvider>
            <RouterProvider router={ router }/>
        </RecipesProvider>

    )
}

export default App

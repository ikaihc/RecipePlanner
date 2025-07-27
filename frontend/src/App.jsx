import './App.css'
import AllRecipes from './pages/AllRecipes.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RecipeDetail from './pages/RecipeDetail.jsx'
import Home from './pages/Home.jsx'

function App () {
    const router = createBrowserRouter([
        { path: '/', element: <Home/> },
        { path: '/all-recipes', element: <AllRecipes/> },
        { path: '/:recipeId/detail', element: <RecipeDetail/> },
    ])

    return (
        <RouterProvider router={ router }/>
    )
}

export default App

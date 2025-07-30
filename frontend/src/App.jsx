import './App.css'
import AllRecipes from './pages/AllRecipes.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RecipeDetail from './pages/RecipeDetail.jsx'
import Home from './pages/Home.jsx'
import RecipesProvider from './contexts/RecipeContext.jsx'
import Favourites from './pages/Favourites.jsx'
import UploadRecipe from './pages/UploadRecipe.jsx'
import MyRecipes from './pages/MyRecipes.jsx'
import UpdateRecipe from './pages/UpdateRecipe.jsx'

function App () {
    const router = createBrowserRouter([
        { path: '/', element: <Home/> },
        { path: '/all-recipes', element: <AllRecipes/>, },
        { path: '/favorites', element: <Favourites/>, },
        { path: '/upload', element: <UploadRecipe/>, },
        { path: '/:recipeId/detail', element: <RecipeDetail/> },
        { path: '/my-recipes', element: <MyRecipes/> },
        { path: '/:recipeId/update-recipe', element: <UpdateRecipe/> },
    ])

    return (
        <RecipesProvider>
            <RouterProvider router={ router }/>
        </RecipesProvider>

    )
}

export default App

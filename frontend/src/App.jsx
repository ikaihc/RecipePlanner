import './App.css'
import NavBar from './components/common/NavBar.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

const router = createBrowserRouter([
    {path:"/",element:<NavBar/> }
])

function App() {
  return (
      <RouterProvider router={router}/>
  )
}

export default App

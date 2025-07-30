import './App.css'
import NavBar from './components/common/NavBar.jsx'
import Home from './components/Home.jsx'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { Outlet } from 'react-router-dom'


// 创建一个 Layout 页面，内含 NavBar
const Layout = () => (
  <>
    <NavBar />
     <div className="pt-16"> {/* 👈 给出 padding-top 64px，对应 h-16 的导航条高度 */}
      <Outlet />
    </div>
   
  </>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // index 表示默认页面
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

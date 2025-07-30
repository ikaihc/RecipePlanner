import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AuthProvider } from './components/auth/AuthContext.jsx' // ✅ 确保路径正确

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  {/* 👈 必须包在最外层 */}
    <App />
    </AuthProvider>
  </StrictMode>,
)
import { useState } from 'react'
import './AuthForm.css' // ✅ 新增：引入样式文件
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext' // ✅ 从 auth 目录正确导入

export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    // Test user credentials for demo
    // const TEST_USERS = [
    //     { email: 'test@example.com', password: 'password' },
    // ]

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const res = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (res.ok) {
                localStorage.setItem('token', data.token)
                alert('Login success')
                login()
                navigate('/')
            } else {
                alert(data.message || 'Login failed')
            }
        } catch (err) {
            console.error(err)
            alert('Something went wrong')
        }

    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Login</h2>
                <form onSubmit={ handleSubmit }>
                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Email"
                        value={ email }
                        onChange={ (e) => setEmail(e.target.value) }
                        required
                    />

                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                        required
                    />


                    <button className="auth-button" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

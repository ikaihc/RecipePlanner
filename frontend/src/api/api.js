import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
})


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        console.log('token',token)

        if (token) {
            const cleanToken = token.replace(/^"|"$/g, '')
            config.headers.Authorization = `Bearer ${ cleanToken }`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            return Promise.reject(new Error('Unauthorized - Please login to continue'))
        }

        if (error.response?.status === 403) {
            return Promise.reject(new Error('Access Denied'))
        }

        const message = error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            'Request Failed'
        return Promise.reject(new Error(message))
    },
)

export default api
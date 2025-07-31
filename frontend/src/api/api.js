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
        // const token = sessionStorage.getItem('token')

        const token = "1|XWyeRG7SBATrTUlvt5rycMrME0P41REliREtmhlab5b42039"
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
            return Promise.reject(new Error('Email or Password is not correct. Please Try Again!'))
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
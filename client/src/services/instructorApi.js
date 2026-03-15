import axios from 'axios'
import { clearInstructorSession } from '../state/sessionActions'

const instructorApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

instructorApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('instructorToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

instructorApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const hasAuthHeader = Boolean(error.config?.headers?.Authorization)

    if (hasAuthHeader && (status === 401 || status === 403)) {
      clearInstructorSession()

      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname

        if (currentPath !== '/signin' && currentPath !== '/signup' && currentPath !== '/signup/instructor') {
          window.location.assign('/signin')
        }
      }
    }

    return Promise.reject(error)
  },
)

export default instructorApi
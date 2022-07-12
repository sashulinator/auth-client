import { LoginResponse, Transfer } from './types'
import axios from 'axios'

const api = axios.create({
  withCredentials: true,
})

api.defaults.headers.common['Content-Type'] = 'application/json'

export const refreshAccessTokenFn = async () => {
  const response = await api.post<Transfer<LoginResponse>>('api/auth/refresh')
  localStorage.setItem('userRole', response.data.dataBlock.role)
  return response.data
}

api.interceptors.response.use(
  (response) => {
    response.headers['userRole'] = localStorage.getItem('userRole') || 'USER'
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const code = error.response.data.meta.code as number
    if (code === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      await refreshAccessTokenFn()
      return api(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default api

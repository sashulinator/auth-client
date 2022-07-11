import { LoginResponse, RegisterResponse, Transfer } from './types'
import axios from 'axios'

const authApi = axios.create({
  withCredentials: true,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json'

export const refreshAccessTokenFn = async () => {
  const response = await authApi.post<Transfer<LoginResponse>>('api/auth/refresh')
  return response.data
}

export const registerUserFn = async () => {
  const response = await authApi.post<Transfer<RegisterResponse>>('api/user/register')
  return response.data
}

authApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const code = error.response.data.meta.code as number
    if (code === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      await refreshAccessTokenFn()
      return authApi(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default authApi

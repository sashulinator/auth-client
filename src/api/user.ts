import api from './api-axios'
import { RegisterResponse, Transfer } from './types'

export const registerUserFn = async () => {
  const response = await api.post<Transfer<RegisterResponse>>('api/user/register')
  return response.data
}

import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'

export default function useLogout() {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate(ROUTES.LOGIN.buildURL())
  }

  return logout
}

import { useNavigate } from 'react-router-dom'

import ROUTES from '@/constants/routes'

export default function useLogout() {
  const navigate = useNavigate()

  function logout() {
    navigate(ROUTES.LOGIN.PATH)
  }

  return logout
}

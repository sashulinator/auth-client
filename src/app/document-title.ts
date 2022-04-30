import { useLocation } from 'react-router-dom'

import { getCurrentRoute } from '@/constants/routes'

// Its a component!!
// It could be a hook but it could effect rerenders
export default function DocumentTitle(): null {
  useLocation()
  const routeName = getCurrentRoute()?.NAME
  const name = routeName ? ` | ${routeName}` : ''
  document.title = `OMS${name}`
  return null
}

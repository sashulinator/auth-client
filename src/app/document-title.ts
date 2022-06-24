import { getCurrent } from '@savchenko91/rc-route-constant'

import { useLocation } from 'react-router-dom'

import ROUTES from '@/constants/routes'

// Its a component!!
// It could be a hook but it could effect rerenders
export default function DocumentTitle(): null {
  useLocation()
  const routeName = getCurrent(ROUTES)?.NAME
  const name = routeName ? ` | ${routeName}` : ''
  document.title = `OMS${name}`
  return null
}

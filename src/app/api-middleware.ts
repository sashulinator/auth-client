import { ACCESS_TOKEN } from '@/constants/localStorage'
import APIMiddleware from '@savchenko91/rc-redux-api-mw'

export default new APIMiddleware({
  headers: () => {
    const headers = [['Content-Type', 'application/json; charset=utf-8']]

    const token = localStorage.getItem(ACCESS_TOKEN)

    if (token) {
      headers.push(['Authorization', `Bearer ${token}`])
    }

    return new Headers(headers)
  },
})

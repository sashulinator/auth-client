import { TOKEN } from '@/constants/localStorage'
import APIMiddleware from '@savchenko91/rc-redux-api-mw'

export default new APIMiddleware({
  headers: () => {
    return new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(TOKEN) || ''}`,
    })
  },
})

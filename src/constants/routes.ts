const ROUTES = {
  LOGIN: {
    NAME: 'login',
    PATH: '/auth/login',
    buildURL() {
      return this.PATH
    },
  },
  USER: {
    NAME: 'users',
    PATH: '/users',
    buildURL() {
      return this.PATH
    },
  },
}

export default ROUTES

const ROUTES = {
  LOGIN: {
    NAME: 'login',
    PATH: '/login',
    buildURL() {
      return this.PATH
    },
  },
  USERS: {
    NAME: 'users',
    PATH: '/users*',
    buildURL() {
      return this.PATH
    },
  },
  'USERS/LIST': {
    NAME: 'user list',
    PATH: '/list',
    buildURL() {
      return `/users${this.PATH}`
    },
  },
  'USERS/CREATE': {
    NAME: 'create user',
    PATH: '/create',
    buildURL() {
      return `/users${this.PATH}`
    },
  },
}

export default ROUTES

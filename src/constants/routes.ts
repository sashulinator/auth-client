const ROUTES = {
  FORM_CONSTRUCTOR: {
    NAME: 'Form constructor',
    PATH: '/form-constructor',
    buildURL(id?: string) {
      return id ? `${this.PATH}/${id}` : this.PATH
    },
  },
  LOGIN: {
    NAME: 'login',
    PATH: '/login',
    buildURL() {
      return this.PATH
    },
  },
  SCHEMA_LIST: {
    NAME: 'Schema list',
    PATH: '/schema-list',
    buildURL() {
      return this.PATH
    },
  },
}

export default ROUTES

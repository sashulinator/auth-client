const ROUTES = {
  FORM_CONSTRUCTOR: {
    NAME: 'Form constructor',
    PATH: '/form-constructor',
    buildURL(id?: string) {
      return id ? `${this.PATH}/${id}` : this.PATH
    },
  },
  LOGIN: {
    NAME: 'Login',
    PATH: '/login',
    buildURL() {
      return this.PATH
    },
  },
  SCHEMA_LIST: {
    NAME: 'Schemas',
    PATH: '/schema-list',
    buildURL() {
      return this.PATH
    },
  },
  INCIDENT_LIST: {
    NAME: 'Incidents',
    PATH: '/incident-list',
    buildURL() {
      return this.PATH
    },
  },
  INCIDENT: {
    NAME: 'Incident',
    PATH: '/incident',
    buildURL(id?: string) {
      return id ? `${this.PATH}/${id}` : this.PATH
    },
  },
}

export type Route = typeof ROUTES[keyof typeof ROUTES]
export type Routes = typeof ROUTES

export function getCurrentRoute(): Route | undefined {
  return Object.values(ROUTES).find((route) => {
    return buildRegExpFromPath(route.PATH).test(window?.location?.pathname)
  })
}

export function buildRegExpFromPath(path: string): RegExp {
  // replace all params like ':id' and then replace optional params like ':id?'
  const regExp = path?.replace(/:([^/])+/g, '([^/])+').replace(/\/:([^/])+\?/, '/?([^/]?)+')

  return new RegExp(`${regExp}(/)?`)
}

export default ROUTES

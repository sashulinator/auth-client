import Route from '@savchenko91/rc-route-constant'

const ROUTES = {
  FORM_CONSTRUCTOR: new Route({ name: 'Form constructor', path: '/form-constructor' }),
  FORM_CONSTRUCTOR_EDIT: new Route({ name: 'Form constructor', path: '/form-constructor/:id' }),

  // return id ? `${this.PATH}/${id}` : this.PATH

  LOGIN: new Route({ name: 'Login', path: '/login' }),

  SCHEMA_LIST: new Route({ name: 'Schemas', path: '/schema-list' }),

  INCIDENT_LIST: new Route({ name: 'Incidents', path: '/incident-list' }),

  CREATE_INCIDENT: new Route({ name: 'Incident', path: '/incident' }),

  INCIDENT: new Route({ name: 'Incident', path: '/incident/:id' }),

  // return id ? `${this.PATH}/${id}` : this.PATH
}

export type Routes = typeof ROUTES

export default ROUTES

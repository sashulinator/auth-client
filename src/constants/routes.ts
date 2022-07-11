import Route from '@savchenko91/rc-route-constant'

const ROUTES = {
  FORM_CONSTRUCTOR: new Route({ name: 'Form constructor', path: '/form-constructor' }),
  FORM_CONSTRUCTOR_EDIT: new Route({ name: 'Form constructor', path: '/form-constructor/:id' }),

  // return id ? `${this.PATH}/${id}` : this.PATH

  LOGIN: new Route({ name: 'Login', path: '/login' }),

  SCHEMA_LIST: new Route({ name: 'Schemas', path: '/schemas', payload: { iconName: 'Favicon' } }),

  INCIDENT_LIST: new Route({ name: 'Incidents', path: '/incidents', payload: { iconName: 'DiffInline' } }),

  CREATE_INCIDENT: new Route({ name: 'Incident', path: '/incidents/create' }),

  INCIDENT: new Route({ name: 'Incident', path: '/incidents/:id' }),

  RISK_LIST: new Route({ name: 'Risks', path: '/risks', payload: { iconName: 'BullseyeTarget' } }),

  USER_PROFILE: new Route({ name: 'User profile', path: '/user-profile' }),
  // return id ? `${this.PATH}/${id}` : this.PATH
}

export type Routes = typeof ROUTES

export default ROUTES

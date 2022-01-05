import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import APIMiddleware from './api-middleware'
import * as user from '../redux/user.reducer'

const isDevelopment = process.env.NODE_ENV === 'development'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
const devtoolsCompose = (window as any)
  .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose

const composeEnhancer =
  isDevelopment && !!devtoolsCompose ? devtoolsCompose : compose

export default createStore(
  combineReducers(user),
  undefined,
  composeEnhancer(applyMiddleware(APIMiddleware.middleware()))
)

import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import APIMiddleware from '@savchenko91/rc-redux-api-mw'
import * as user from '../redux/user.reducer'

const isDevelopment = process.env.NODE_ENV === 'development'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const devtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhancer =
  isDevelopment && !!devtoolsCompose ? devtoolsCompose : compose

export default createStore(
  combineReducers(user),
  undefined,
  composeEnhancer(applyMiddleware(new APIMiddleware().middleware()))
)

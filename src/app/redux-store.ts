import queryMiddleware from '@savchenko91/rc-redux-api-mw-query'

import { reducers as auth } from '../redux/auth'
import * as user from '../redux/user.reducer'
import APIMiddleware from './api-middleware'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'

const isDevelopment = process.env.NODE_ENV === 'development'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
const devtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose

const composeEnhancer = isDevelopment && !!devtoolsCompose ? devtoolsCompose : compose

export default createStore(
  combineReducers({ ...user, auth }),
  undefined,
  composeEnhancer(applyMiddleware(queryMiddleware(), APIMiddleware.middleware()))
)

import { compose, createStore, combineReducers } from 'redux'

const isDevelopment = process.env.NODE_ENV === 'development'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const devtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhancer =
  isDevelopment && !!devtoolsCompose ? devtoolsCompose : compose

export default createStore(
  combineReducers({
    test: () => 'init',
  }),
  undefined,
  composeEnhancer()
)

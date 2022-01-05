import ReactDOM from 'react-dom'
import { LayerRoutes } from './layer-routes'
import { Provider } from 'react-redux'
import store from './app/redux-store'

export const App = () => {
  return (
    <Provider store={store}>
      <LayerRoutes />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

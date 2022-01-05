import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import RootLayer from './layer'
import store from './redux-store'

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RootLayer />
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import App from './src/index'
import reducer from './src/reducers'
require('./src/css/style.scss')

const store = createStore(reducer)

export default class Home extends PureComponent {
  render() {
    return <Provider store={store}>
      <App/>
    </Provider>
  }
}

ReactDOM.render(<Home/>, document.getElementById('root'))
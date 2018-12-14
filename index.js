import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import App from './src/index'
require('./src/css/style.scss')

export default class Home extends PureComponent {
  render() {
    return <App/>
  }
}

ReactDOM.render(<Home/>, document.getElementById('root'))
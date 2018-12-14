require('./src/css/index.css')
require('./src/css/style.scss')
let imageObject = require('./images/collect.png')

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

class Greeting extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}

ReactDOM.render(Greeting, document.getElementById('root'))
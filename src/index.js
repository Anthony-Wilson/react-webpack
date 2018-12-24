import React, { PureComponent } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Home from './Home'
import Desc from './Desc'
import Us from './Us'

export default class Index extends PureComponent {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>主页</Link>
              </li>
              <li>
                <Link to='/desc'>简介</Link>
              </li>
              <li>
                <Link to='/us'>关于我们</Link>
              </li>
            </ul>
          </nav>

          <Route exact path='/' component={Home}/>
          <Route path='/desc' component={Desc}/>
          <Route path='/us' component={Us}/>
        </div>
      </Router>
    )
  }
}

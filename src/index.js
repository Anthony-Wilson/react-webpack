import React, { PureComponent } from 'react'

import AddToto from './containers/AddTodo'
import Handle from './components/Handle'
import VisibleFilter from './containers/VisibleFilter'

export default class Index extends PureComponent {
  render() {
    return (
      <div>
        <AddToto/>
        <VisibleFilter/>
        <Handle/>
      </div>
    )
  }
}

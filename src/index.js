import React, { PureComponent } from 'react'

import AddToto from './containers/AddTodo'
import VisibleFilter from './containers/VisibleFilter'
import Filter from './containers/Filter'

export default class Index extends PureComponent {
  render() {
    return (
      <div>
        <AddToto/>
        <VisibleFilter/>
        <Filter/>
      </div>
    )
  }
}

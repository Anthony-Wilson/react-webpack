import React, { PureComponent } from 'react'
import {
  ButtonGroup,
  Button
} from 'react-bootstrap'

export default class Handle extends PureComponent {
  showDoing() {
    alert(1)
  }
  showComplete(){

  }
  showAll(){

  }
  render() {
    return (
      <div className='footer'>
        <ButtonGroup aria-label="Basic example">
          <Button variant="danger" onClick={this.showDoing}>进行中</Button>
          <Button variant="success" onClick={this.showComplete}>已完成</Button>
          <Button variant="primary" onClick={this.showAll}>全部</Button>
        </ButtonGroup>
      </div>
    )
  }
}

// const Handle = ({}) => {
//   return (
//     <ButtonGroup aria-label="Basic example">
//       <Button variant="danger" onClick={this.showDoing}>进行中</Button>
//       <Button variant="success" onClick={this.showComplete}>已完成</Button>
//       <Button variant="primary" onClick={this.showAll}>全部</Button>
//     </ButtonGroup>
//   )
// }
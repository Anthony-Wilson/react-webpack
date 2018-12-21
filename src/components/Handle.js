import React, { PureComponent } from 'react'
import {
  ButtonGroup,
  Button
} from 'react-bootstrap'

const Handle = ({handleClick}) => {
  return (
    <ButtonGroup aria-label="Basic example">
      <Button variant="danger" onClick={() => handleClick('SHOW_ACTIVE')}>进行中</Button>
      <Button variant="success" onClick={() => handleClick('SHOW_COMPLETE')}>已完成</Button>
      <Button variant="primary" onClick={() => handleClick('SHOW_ALL')}>全部</Button>
    </ButtonGroup>
  )
}

export default Handle
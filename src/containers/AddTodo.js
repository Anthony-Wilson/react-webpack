import React from 'react'
import {
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap'
import {connect} from 'react-redux'
import {addTodo} from '../actions'

const AddTodo = ({dispatch}) => {
  let input
  return (
    <div className='header'>
      <h1 lcas>reaci-redux  todo list</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="请输入待添加的代办项"
          aria-label="请输入待添加的代办项"
          aria-describedby="basic-addon2"
          ref={text => input = text}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={() => {
            if( input.value.trim() == '' ) return
            dispatch(addTodo(input.value))
            input.value = ''
          }}>添加</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )
}
export default connect()(AddTodo)
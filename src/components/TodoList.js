import React from 'react'
import {
  ListGroup
} from 'react-bootstrap'

const TodoList = ({todos, toggleTodo}) => {
  return (
    <ListGroup>
      {
        todos.map((item, index) => <ListGroup.Item
          key={index}
          onClick={() => toggleTodo(item.index)}
          variant={item.complete ? 'success' : 'danger'}
        >{item.text}</ListGroup.Item>)
      }
    </ListGroup>
  )
}

export default TodoList
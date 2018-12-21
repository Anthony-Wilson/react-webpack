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
        >
          <span className='name'>{item.text}</span>
          <span className='state'>{item.complete ? '已完成' : '未完成'}</span>
        </ListGroup.Item>)
      }
    </ListGroup>
  )
}

export default TodoList
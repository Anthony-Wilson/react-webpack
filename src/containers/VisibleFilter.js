import {connect} from 'react-redux'
import {TODOS_TYPE, toggleTodo} from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch(filter){
    case TODOS_TYPE.SHOW_ALL:
      return todos
    case TODOS_TYPE.SHOW_COMPLETE:
      return todos.filter(t => t.complete)
    case TODOS_TYPE.SHOW_ACTIVE:
      return todos.filter(t => !t.complete)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}
const mapStateToProps = state => {
  return ({
    todos: getVisibleTodos(state.todos, state.filterCompleteOrNot)
  })
}

const mapDispatchToProps = dispatch => ({
  toggleTodo: index => dispatch(toggleTodo(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
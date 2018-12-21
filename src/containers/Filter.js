import {connect} from 'react-redux'
import {TODOS_TYPE, filterCompleteOrNot} from '../actions'
import Handle from '../components/Handle'

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
  handleClick: filter => dispatch(filterCompleteOrNot(filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Handle)
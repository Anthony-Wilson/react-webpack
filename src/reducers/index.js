import { combineReducers } from 'redux'
let initState = {
  todos: [],
  visibilityFilter: "SHOW_ALL"
}

const todos = (state=initState.todos, action) => {
  switch (action.type) {
    case "ADD_TODO":
      // 千万不要使用push，返回的是数组的长度
      return [
          ...state,
          {
            text: action.text,
            complete: false,
            index: action.index
          }
        ]
    case "TOGGLE_TODO":
      return state.map((item, index) => {
        if( action.index == index ) {
          return Object.assign({}, item, {
            complete: !item.complete
          })
        }
        return item
      })
    default:
      return state
  }
}

const filterCompleteOrNot = (state=initState.visibilityFilter, action) => {
  switch (action.type) {
    case "FILTER_COMPLETE_OR_NOT":
      return action.filter
    default:
      return state
  }
}

const todoApp = combineReducers({
  todos,
  filterCompleteOrNot
})
export default todoApp
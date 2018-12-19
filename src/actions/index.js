let initNumber = 0
const addTodo = (text) => ({
  text,
  type: "ADD_TODO",
  index: initNumber++
})

const toggleTodo = (index) => ({
  index,
  type: 'TOGGLE_TODO'
})

const filterCompleteOrNot = (filter) => ({
  filter,
  type: 'FILTER_COMPLETE_OR_NOT'
})

const TODOS_TYPE = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETE: "SHOW_COMPLETE",
  SHOW_ACTIVE: "SHOW_ACTIVE"
}

module.exports = {
  addTodo,
  toggleTodo,
  filterCompleteOrNot,
  TODOS_TYPE
}
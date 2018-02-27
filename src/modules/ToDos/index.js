import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  addTodo,
  completeTodo,
  deleteTodo,
  loadTodos,
  makeGetTodos,
} from './duck'

import ToDos from './view'

const mapStateToProps = createStructuredSelector({
  todos: makeGetTodos(),
})

const mapDispatchToProps = {
  handleComplete: completeTodo,
  handleSubmit: addTodo,
  handleDelete: deleteTodo,
  requestTodos: loadTodos,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ToDos))

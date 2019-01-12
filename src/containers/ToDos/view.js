import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { is } from 'immutable'
import { Helmet } from 'react-helmet'

import todoType from 'types/todo'
import matchType from 'types/match'

import AddTodoForm from 'containers/AddTodoForm'

import MainNav from 'components/MainNav'
import TodoList from 'components/TodoList'

import messages from './messages'

// eslint-disable-next-line react/prefer-stateless-function
class ToDos extends React.Component {
  componentWillMount() {
    const { requestTodos } = this.props

    requestTodos()
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this

    return !is(nextProps.todos, props.todos) || !is(nextProps.match, props.match)
  }

  render() {
    const {
      handleComplete,
      handleDelete,
      handleSubmit,
      intl,
      match: { params } = { params: {} },
      todos,
    } = this.props

    function onSubmit(vals) {
      handleSubmit(vals)
    }

    const title = 'Todos list'

    return (
      <div>
        <Helmet>
          <title>{intl.formatMessage(messages.title)}</title>
        </Helmet>

        <MainNav filter={params.filter} />

        <AddTodoForm onSubmit={onSubmit} />

        <TodoList
          handleComplete={handleComplete}
          handleDelete={handleDelete}
          todos={todos}
        />
      </div>
    )
  }
}

ToDos.propTypes = {
  /** Function to execute when changing the "done" checkbox. */
  handleComplete: PropTypes.func.isRequired,
  /** Function to execute when clicking the delete icon. */
  handleDelete: PropTypes.func.isRequired,
  /** Function to execute when submitting the addTodoForm. */
  handleSubmit: PropTypes.func.isRequired,
  /** intl function */
  intl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** React-router match prop. */
  match: matchType,
  /** Function to request all todos to the server. */
  requestTodos: PropTypes.func,
  /** Immutable list of Todo types. */
  todos: ImmutablePropTypes.listOf(todoType, PropTypes.string).isRequired,
}

export default ToDos

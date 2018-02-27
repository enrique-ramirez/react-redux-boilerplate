import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import {
  Container,
} from 'components/Grid'

import todoType from 'types/todo'

import styles from './styles.css'
import TodoRow from './TodoRow'

function TodoList(props) {
  const {
    handleComplete,
    handleDelete,
    todos,
  } = props

  const classes = `${styles.todoList}`

  return (
    <Container isFluid>
      <ul className={classes}>
        {todos.map((todo) => {
          const id = Map({ id: todo.get('id') })
          const _handleComplete = () => handleComplete(id)
          const _handleDelete = () => handleDelete(id)

          return (
            <TodoRow
              key={id}
              handleComplete={_handleComplete}
              handleDelete={_handleDelete}
              todo={todo}
            />
          )
        })}
      </ul>
    </Container>
  )
}

TodoList.propTypes = {
  /** Function to execute when changing the "done" checkbox. */
  handleComplete: PropTypes.func.isRequired,
  /** Function to execute when clicking the delete icon. */
  handleDelete: PropTypes.func.isRequired,
  /** Immutable List of Todos. */
  todos: ImmutablePropTypes.listOf(todoType, PropTypes.string).isRequired,
}

export default TodoList

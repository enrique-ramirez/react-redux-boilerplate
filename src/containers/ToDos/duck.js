import { createAction, handleActions } from 'redux-actions'
import { takeLatest, put, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import { fromJS, List, Map } from 'immutable'
import { normalize, denormalize } from 'normalizr'

import {
  domain,
  ERROR,
  PENDING,
  SUCCESS,
} from 'store/constants'

import {
  completeTask,
  createTask,
  deleteTask,
  loadTasks,
} from 'utils/api'

import todo from 'store/schemas/todo'

/* Actions */
const todos = domain.defineAction('todos')

export const ADD_TODO = todos.defineAction('ADD_TODO', [SUCCESS, ERROR])
export const COMPLETE_TODO = todos.defineAction('COMPLETE_TODO', [SUCCESS, ERROR])
export const DELETE_TODO = todos.defineAction('DELETE_TODO', [SUCCESS, ERROR])
export const LOAD_TODOS = todos.defineAction('LOAD_TODOS', [PENDING, SUCCESS, ERROR])

/* Reducer */
const defaultState = List([])

const reducer = handleActions({
  [LOAD_TODOS.SUCCESS]: (state, action) => state.concat(action.payload),

  [ADD_TODO.SUCCESS]: (state, action) => state.unshift(action.payload),

  [DELETE_TODO.SUCCESS]: (state, action) => state.delete(state.indexOf(action.payload)),
}, defaultState)

export default reducer

/* Selectors */
export const getTodos = (state) => {
  // eslint-disable-next-line reselect/first-param-name
  const todosWithEntities = state.reduce((aggr, value, key) => {
    let result = aggr

    if (key === 'entities') {
      result = result.set(key, value)
    }

    if (key === 'resources') {
      result = result.set('todos', value.get('todos'))
    }

    return result
  }, Map())

  return todosWithEntities
}

export const getFilter = (state, { match }) => (match ? match.params.filter : '')

export const makeGetTodos = () => createSelector(
  [getFilter, getTodos],
  (filter, state) => {
    const result = denormalize(state.get('todos'), [todo], state.get('entities'))

    switch (filter) {
      case 'active':
        return result.filterNot(item => item.get('done'))

      case 'done':
        return result.filter(item => item.get('done'))

      default:
        return result
    }
  },
)

/* Action Creators */
export const addTodo = createAction(ADD_TODO.ACTION)
export const completeTodo = createAction(COMPLETE_TODO.ACTION)
export const deleteTodo = createAction(DELETE_TODO.ACTION)
export const loadTodos = createAction(LOAD_TODOS.ACTION)

/* Side Effects */
export function* createTodoSaga(action) {
  try {
    const response = yield call(createTask, action.payload.toJS())
    const normalized = yield call(normalize, response, todo)
    yield put({
      type: ADD_TODO.SUCCESS,
      payload: fromJS(normalized.result),
      entities: fromJS(normalized.entities),
    })
  } catch (err) {
    yield put({ type: ADD_TODO.ERROR, payload: { error: err } })
  }
}

export function* completeTodoSaga(action) {
  try {
    const response = yield call(completeTask, action.payload.toJS())
    const normalized = yield call(normalize, response, todo)
    yield put({
      type: COMPLETE_TODO.SUCCESS,
      payload: fromJS(normalized.result),
      entities: fromJS(normalized.entities),
    })
  } catch (err) {
    yield put({ type: COMPLETE_TODO.ERROR, payload: { error: err } })
  }
}

export function* deleteTodoSaga(action) {
  try {
    const response = yield call(deleteTask, action.payload.toJS())
    yield put({ type: DELETE_TODO.SUCCESS, payload: response.id })
  } catch (err) {
    yield put({ type: DELETE_TODO.ERROR, payload: { error: err } })
  }
}

export function* loadTodosSaga() {
  try {
    const response = yield call(loadTasks)
    const normalized = yield call(normalize, response, [todo])

    yield put({
      type: LOAD_TODOS.SUCCESS,
      payload: fromJS(normalized.result),
      entities: fromJS(normalized.entities),
    })
  } catch (err) {
    yield put({ type: LOAD_TODOS.ERROR, payload: { error: err } })
  }
}

/* eslint-disable */
export const todosWatchers = [
  takeLatest(ADD_TODO.ACTION, createTodoSaga),
  takeLatest(COMPLETE_TODO.ACTION, completeTodoSaga),
  takeLatest(DELETE_TODO.ACTION, deleteTodoSaga),
  takeLatest(LOAD_TODOS.ACTION, loadTodosSaga),
]
/* eslint-enable */

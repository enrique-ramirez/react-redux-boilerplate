import { fromJS, is, List } from 'immutable'
import { put } from 'redux-saga/effects'
import * as matchers from 'jest-immutable-matchers'

import reducer, {
  ADD_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  LOAD_TODOS,
  addTodo,
  completeTodo,
  deleteTodo,
  loadTodos,
  createTodoSaga,
  completeTodoSaga,
  deleteTodoSaga,
  loadTodosSaga,
  getTodos,
  makeGetTodos,
} from 'containers/ToDos/duck'

describe('todos duck', () => {
  beforeAll(() => {
    jest.addMatchers(matchers)
  })

  describe('actions', () => {
    it('completeTodo', () => {
      const fixture = { id: '1337' }
      const expected = {
        type: COMPLETE_TODO.ACTION,
        payload: fixture,
      }

      expect(completeTodo(fixture)).toEqual(expected)
    })

    it('deleteTodo', () => {
      const fixture = { id: '1337' }
      const expected = {
        type: DELETE_TODO.ACTION,
        payload: fixture,
      }

      expect(deleteTodo(fixture)).toEqual(expected)
    })

    it('addTodo', () => {
      const fixture = { id: '1337' }
      const expected = {
        type: ADD_TODO.ACTION,
        payload: fixture,
      }

      expect(addTodo(fixture)).toEqual(expected)
    })

    it('loadTodos', () => {
      const expected = {
        type: LOAD_TODOS.ACTION,
      }

      expect(loadTodos()).toEqual(expected)
    })
  })

  describe('reducer', () => {
    let initialState

    beforeAll(() => {
      initialState = fromJS(['1', '2', '3', '4'])
    })

    it('should return initial immutable state', () => {
      expect(reducer(undefined, {})).toBeImmutableList()
    })

    it('should handle addTodo', () => {
      const newTodo = List(['8'])
      const getExpected = fixture => (
        initialState.unshift(fixture)
      )

      expect(is(reducer(initialState, {
        type: ADD_TODO.SUCCESS,
        payload: newTodo,
      }), getExpected(newTodo))).toEqual(true)
    })

    it('should handle deleteTodo', () => {
      const getExpected = fixture => initialState.delete(initialState.indexOf(fixture))

      expect(reducer(initialState, {
        type: DELETE_TODO.SUCCESS,
        payload: '1',
      })).toEqual(getExpected('1'))
      expect(reducer(initialState, {
        type: DELETE_TODO.SUCCESS,
        payload: '2',
      })).toEqual(getExpected('2'))
      expect(reducer(initialState, {
        type: DELETE_TODO.SUCCESS,
        payload: '3',
      })).toEqual(getExpected('3'))
    })

    it('should handle loadTodos', () => {
      const loadedTodos = fromJS(['20', '30', '40'])
      const getExpected = fixture => initialState.concat(fixture)

      expect(reducer(initialState, {
        type: LOAD_TODOS.SUCCESS,
        payload: loadedTodos,
      })).toEqual(getExpected(loadedTodos))
    })
  })

  describe('selectors', () => {
    describe('getTodos', () => {
      it('should select the todos domain with entities', () => {
        const mockedState = fromJS({
          resources: {
            todos: [],
            somethingElse: 'I don\'t care',
            moreStuff: 'I don\'t need you',
          },
          entities: {},
        })
        const expected = fromJS({
          todos: [],
          entities: {},
        })

        expect(getTodos(mockedState)).toEqual(expected)
      })
    })

    describe('makeGetTodos', () => {
      const todosSelector = makeGetTodos()
      const todos = {
        1: { title: 'Workout', description: 'Once in a while', done: false, id: '1' },
        2: { title: 'Eat', description: 'To your heart\'s content', done: true, id: '2' },
        3: { title: 'Procrastinate', description: 'You deserve it!', done: true, id: '3' },
        4: { title: 'Pay bills', description: 'Before they grow more!', done: false, id: '4' },
      }

      const mockedState = fromJS({
        resources: {
          todos,
        },
      })

      it('should select all todos', () => {
        expect(todosSelector(mockedState, {})).toEqual(fromJS(todos))
      })

      it('should select all active (undone) todos', () => {
        const filter = 'active'
        const props = {
          match: {
            params: { filter },
          },
        }
        const expected = mockedState.getIn(['resources', 'todos']).filter(item => !item.get('done'))

        expect(todosSelector(mockedState, props)).toEqual(expected)
      })

      it('should select all completed (done) todos', () => {
        const filter = 'done'
        const props = {
          match: {
            params: { filter },
          },
        }
        const expected = mockedState.getIn(['resources', 'todos']).filter(item => item.get('done'))

        expect(todosSelector(mockedState, props)).toEqual(expected)
      })
    })
  })

  describe('sagas', () => {
    describe('createTodoSaga', () => {
      const fixture = { payload: fromJS({}) }
      let generator

      beforeEach(() => {
        generator = createTodoSaga(fixture)

        const callDescriptor = generator.next().value
        expect(callDescriptor).toMatchSnapshot()
      })

      it('should call an api function and dispatch ADD_TODO.SUCCESS on success', () => {
        const response = {
          result: ['hyrule-123'],
          entities: {
            todos: {
              'hyrule-123': { name: 'Link' },
            },
          },
        }
        const callDescriptor = generator.next(response)
        const putDescriptor = generator.next(response).value

        expect(callDescriptor).toMatchSnapshot()
        // eslint-disable-next-line
        expect(putDescriptor).toEqual(put({
          type: ADD_TODO.SUCCESS,
          entities: fromJS(response.entities),
          payload: fromJS(response.result),
        }))
      })

      it('should call ADD_TODO.ERROR on error', () => {
        const response = new Error('Ganon wins!')
        const putDescriptor = generator.throw(response).value

        // eslint-disable-next-line
        expect(putDescriptor).toEqual(put({ type: ADD_TODO.ERROR, payload: { error: response } }))
      })
    })

    describe('completeTodoSaga', () => {
      const fixture = { payload: fromJS({}) }
      let generator

      beforeEach(() => {
        generator = completeTodoSaga(fixture)

        const callDescriptor = generator.next().value
        expect(callDescriptor).toMatchSnapshot()
      })

      it('should call an api function and dispatch COMPLETE_TODO.SUCCESS on success', () => {
        const response = {
          result: ['hyrule-124'],
          entities: {
            todos: {
              'hyrule-124': { name: 'Zelda' },
            },
          },
        }
        const callDescriptor = generator.next(response).value
        const putDescriptor = generator.next(response).value

        expect(callDescriptor).toMatchSnapshot()
        // eslint-disable-next-line
        expect(putDescriptor).toEqual(put({
          type: COMPLETE_TODO.SUCCESS,
          entities: fromJS(response.entities),
          payload: fromJS(response.result),
        }))
      })

      it('should call COMPLETE_TODO.ERROR on error', () => {
        const callDescriptor = generator.next().value
        const response = new Error('Ganon wins!')
        const putDescriptor = generator.throw(response).value

        expect(callDescriptor).toMatchSnapshot()
        // eslint-disable-next-line
        expect(putDescriptor).toEqual(put({ type: COMPLETE_TODO.ERROR, payload: { error: response } }))
      })
    })

    describe('deleteTodoSaga', () => {
      const fixture = { payload: fromJS({}) }
      let generator

      beforeEach(() => {
        generator = deleteTodoSaga(fixture)
      })

      it('should call an api function and dispatch DELETE_TODO.SUCCESS on success', () => {
        const callDescriptor = generator.next().value
        const response = { name: 'Ganon', id: 'hyrule-125' }
        const putDescriptor = generator.next(response).value

        expect(callDescriptor).toMatchSnapshot()
        // eslint-disable-next-line
        expect(putDescriptor).toEqual(put({ type: DELETE_TODO.SUCCESS, payload: response.id }))
      })

      it('should call DELETE_TODO.ERROR on error', () => {
        const callDescriptor = generator.next().value
        const response = new Error('Ganon wins!')
        const putDescriptor = generator.throw(response).value

        expect(callDescriptor).toMatchSnapshot()
        // eslint-disable-next-line
        expect(putDescriptor).toEqual(put({ type: DELETE_TODO.ERROR, payload: { error: response } }))
      })
    })

    describe('loadTodosSaga', () => {
      const fixture = { payload: fromJS({}) }
      let generator

      beforeEach(() => {
        generator = loadTodosSaga(fixture)

        const callDescriptor = generator.next().value

        expect(callDescriptor).toMatchSnapshot()
      })

      it('should call an api function and dispatch LOAD_TODOS.SUCCESS on success', () => {
        const response = {
          entities: {
            todos: {
              'hyrule-126': { name: 'Ingo' },
            },
            categories: {
              'hyrule-234': { name: 'Princess saving' },
            },
          },
        }
        const callDescriptor = generator.next(response)
        const putDescriptor = generator.next(response).value

        expect(callDescriptor).toMatchSnapshot()
        // eslint-disable-next-line
        expect(putDescriptor).toEqual(put({
          type: LOAD_TODOS.SUCCESS,
          payload: fromJS(response.result),
          entities: fromJS(response.entities),
        }))
      })

      it('should call LOAD_TODOS.ERROR on error', () => {
        const response = new Error('Ganon wins!')
        const putDescriptor = generator.throw(response).value

        // eslint-disable-next-line
        expect(putDescriptor).toEqual(put({ type: LOAD_TODOS.ERROR, payload: { error: response } }))
      })
    })
  })
})

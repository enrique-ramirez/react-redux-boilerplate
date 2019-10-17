import React from 'react'
import { createIntl, createIntlCache } from 'react-intl'
import { shallowWithIntl } from 'utils/intl-enzyme'
import { fromJS } from 'immutable'

import ToDos from 'containers/ToDos/view'

const cache = createIntlCache()
const intl = createIntl({
  locale: 'en',
  messages: {},
}, cache)

describe('<ToDos />', () => {
  const initialState = fromJS({
    resources: {
      todos: [
        { title: 'A todo', description: 'Do me!', id: '1', done: false },
        { title: 'A todo', description: 'Do me!', id: '2', done: true },
        { title: 'A todo', description: 'Do me!', id: '3', done: false },
        { title: 'A todo', description: 'Do me!', id: '4', done: true },
      ],
    },
  })

  it('should render <TodoList />', () => {
    const noop = jest.fn()
    const handleSubmit = jest.fn()
    const wrapper = shallowWithIntl(<ToDos
      handleComplete={noop}
      handleDelete={noop}
      handleSubmit={handleSubmit}
      intl={intl}
      requestTodos={noop}
      todos={initialState.getIn(['resources', 'todos'])}
    />)

    expect(wrapper.find('TodoList')).toHaveLength(1)
  })

  it('should render the <MainNav /> component', () => {
    const noop = jest.fn()
    const wrapper = shallowWithIntl(<ToDos
      handleComplete={noop}
      handleDelete={noop}
      handleSubmit={noop}
      intl={intl}
      requestTodos={noop}
      todos={initialState.getIn(['resources', 'todos'])}
    />)

    expect(wrapper.find('MainNav')).toHaveLength(1)
  })

  it('should update only when todos or match props has changed', () => {
    const noop = jest.fn()
    const wrapper = shallowWithIntl(<ToDos
      handleComplete={noop}
      handleDelete={noop}
      handleSubmit={noop}
      intl={intl}
      requestTodos={noop}
      todos={fromJS([])}
    />)
    const shouldUpdate = wrapper.instance().shouldComponentUpdate({ todos: initialState.getIn(['resources', 'todos']) })
    const shouldNotUpdate = wrapper.instance().shouldComponentUpdate({ todos: fromJS([]) })

    expect(shouldUpdate).toBe(true)
    expect(shouldNotUpdate).toBe(false)
  })

  it('should call requestTodos once mounted', () => {
    const noop = jest.fn()
    const requestTodos = jest.fn()

    shallowWithIntl(<ToDos
      handleComplete={noop}
      handleDelete={noop}
      handleSubmit={noop}
      intl={intl}
      requestTodos={requestTodos}
      todos={fromJS([])}
    />)

    expect(requestTodos).toHaveBeenCalledTimes(1)
  })
})

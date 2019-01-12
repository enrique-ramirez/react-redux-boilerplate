import React from 'react'
import { fromJS } from 'immutable'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

import ConnectedToDos from 'containers/ToDos'
import ToDos from 'containers/ToDos/view'

describe('Connected <ToDos />', () => {
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

  let store
  let mockStore

  beforeEach(() => {
    mockStore = configureStore([])
    store = mockStore(initialState)
  })

  it('props should match mapStateToProps', () => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={{ en: {} }}>
          <MemoryRouter>
            <ConnectedToDos />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
      {},
    )
    const props = wrapper.find(ToDos).props()

    expect(props.todos).toEqual(initialState.getIn(['resources', 'todos']))
  })

  it('props should match mapDispatchToProps', () => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={{ en: {} }}>
          <MemoryRouter>
            <ConnectedToDos />
          </MemoryRouter>
        </IntlProvider>
      </Provider>,
      {},
    )

    wrapper.find('input[type="checkbox"]').first().simulate('change')
    wrapper.find('form').simulate('submit')
    wrapper.find('Icon[name="DELETE"]').first().simulate('click')

    const actions = store.getActions()
    const todosActions = actions.filter(action => action.type.includes('/todos/'))

    expect(todosActions).toHaveLength(4)
  })
})

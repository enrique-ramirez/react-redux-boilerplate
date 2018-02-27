import React from 'react'
import PropTypes from 'prop-types'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'
import { fromJS } from 'immutable'
import { MemoryRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

import ConnectedToDos from 'modules/ToDos'

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

  let mockStore
  let store

  beforeAll(() => {
    mockStore = configureStore([])
    store = mockStore(initialState)
  })

  it('props should match mapStateToProps', () => {
    const wrapper = shallow(<ConnectedToDos store={store} />)

    expect(wrapper.prop('todos')).toEqual(initialState.getIn(['resources', 'todos']))
  })

  it('props should match mapDispatchToProps', () => {
    const wrapper = mount(
      <IntlProvider locale="en" messages={{ en: {} }}>
        <MemoryRouter>
          <ConnectedToDos />
        </MemoryRouter>
      </IntlProvider>,
      {
        context: { store },
        childContextTypes: { store: PropTypes.object.isRequired },
      },
    )

    wrapper.find('input[type="checkbox"]').first().simulate('change')
    wrapper.find('form').simulate('submit')
    wrapper.find('Icon[name="DELETE"]').first().simulate('click')

    const actions = store.getActions()
    const todosActions = actions.filter(action => action.type.includes('/todos/'))

    expect(todosActions).toHaveLength(4)
  })
})

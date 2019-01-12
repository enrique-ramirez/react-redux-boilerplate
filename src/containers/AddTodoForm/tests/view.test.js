import React from 'react'
import { shallowWithIntl } from 'utils/intl-enzyme'
import { Field } from 'redux-form/immutable'

import AddTodoForm from 'containers/AddTodoForm/view'

describe('<AddTodoForm />', () => {
  it('should render the addTodoForm', () => {
    const wrapper = shallowWithIntl(<AddTodoForm intl={{}} />)

    expect(wrapper.find('form')).toHaveLength(1)
    expect(wrapper.find(Field)).toHaveLength(2)
  })

  it('should handle onSubmit', () => {
    const handler = jest.fn()
    const wrapper = shallowWithIntl(<AddTodoForm handleSubmit={handler} />)

    wrapper.find('form').simulate('submit')

    expect(handler).toHaveBeenCalledTimes(1)
  })
})

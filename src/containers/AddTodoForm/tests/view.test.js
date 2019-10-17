import React from 'react'
import { createIntl, createIntlCache } from 'react-intl'
import { shallowWithIntl } from 'utils/intl-enzyme'
import { Field } from 'redux-form/immutable'

import AddTodoForm from 'containers/AddTodoForm/view'

const cache = createIntlCache()
const intl = createIntl({
  locale: 'en',
  messages: {},
}, cache)

jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({
    formatMessage: () => 'mock wording',
  }),
}))

describe('<AddTodoForm />', () => {
  it('should render the addTodoForm', () => {
    const wrapper = shallowWithIntl(<AddTodoForm intl={intl} />)

    expect(wrapper.find('form')).toHaveLength(1)
    expect(wrapper.find(Field)).toHaveLength(2)
  })

  it('should handle onSubmit', () => {
    const handler = jest.fn()
    const wrapper = shallowWithIntl(<AddTodoForm handleSubmit={handler} intl={intl} />)

    wrapper.find('form').simulate('submit')

    expect(handler).toHaveBeenCalledTimes(1)
  })
})

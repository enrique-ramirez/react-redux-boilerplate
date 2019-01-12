import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'
import { IntlProvider, FormattedMessage, defineMessages } from 'react-intl'

import ConnectedLanguageProvider from 'containers/LanguageProvider'

const messages = defineMessages({
  // This is a test text
  someText: 'I am a text',
})

describe('Connected <LanguageProvider />', () => {
  const initialState = fromJS({
    resources: {
      languageProvider: {
        language: 'en',
      },
    },
  })

  let mockStore
  let store

  beforeAll(() => {
    mockStore = configureStore([])
    store = mockStore(initialState)
  })

  it('should render the default language messages', () => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={{ en: {} }}>
          <ConnectedLanguageProvider locale="en" messages={messages}>
            <FormattedMessage {...messages.someText} />
          </ConnectedLanguageProvider>
        </IntlProvider>
      </Provider>,
      {},
    )

    expect(wrapper.contains(<FormattedMessage {...messages.someText} />)).toBe(true)
  })
})

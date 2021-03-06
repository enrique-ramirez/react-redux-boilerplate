import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { fromJS } from 'immutable'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import AddTodoForm from '../src/containers/AddTodoForm'

const mockStore = configureStore([])

storiesOf('AddTodoForm', module)
  .addDecorator((story, context) => withInfo('common info')(story)(context))
  .add('Default', () => {
    const initialState = fromJS({})
    const store = mockStore(initialState)

    return (
      <Provider store={store}>
        <AddTodoForm onSubmit={action('onSubmit')} />
      </Provider>
    )
  })

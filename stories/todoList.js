import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withInfo } from '@storybook/addon-info'
import { fromJS } from 'immutable'

import TodoList from '../src/components/TodoList'

storiesOf('TodoList', module)
  .addDecorator((story, context) => withInfo('common info')(story)(context))
  .add('TodoList active', () => {
    const state = fromJS([
      { title: 'Create a To-do app', description: 'Use all you know about react/redux to do so!', id: 1, done: false },
      { title: 'Create a Pull Request', description: 'Submit your solution for review!', id: 2, done: false },
      { title: 'Eat!', description: 'It\'s apparently quite important', id: 3, done: false },
      { title: 'Rest!', description: 'Like eating, it seems like this is also really important', id: 4, done: false },
      { title: 'Have social life!', description: 'Ok, now we\'re just being ridiculous...', id: 5, done: false },
      { title: 'Work!', description: 'THERE\'S NOT ENOUGH TIME!', id: 6, done: false },
    ])

    return (
      <TodoList
        handleComplete={action('handleComplete')}
        handleDelete={action('handleDelete')}
        todos={state}
      />
    )
  })
  .add('TodoList done', () => {
    const state = fromJS([
      { title: 'Create a To-do app', description: 'Use all you know about react/redux to do so!', id: 1, done: true },
      { title: 'Create a Pull Request', description: 'Submit your solution for review!', id: 2, done: true },
      { title: 'Eat!', description: 'It\'s apparently quite important', id: 3, done: true },
      { title: 'Rest!', description: 'Like eating, it seems like this is also really important', id: 4, done: true },
      { title: 'Have social life!', description: 'Ok, now we\'re just being ridiculous...', id: 5, done: true },
      { title: 'Work!', description: 'THERE\'S NOT ENOUGH TIME!', id: 6, done: true },
    ])

    return (
      <TodoList
        handleComplete={action('handleComplete')}
        handleDelete={action('handleDelete')}
        todos={state}
      />
    )
  })
  .add('TodoList mixed', () => {
    const state = fromJS([
      { title: 'Create a To-do app', description: 'Use all you know about react/redux to do so!', id: 1, done: false },
      { title: 'Create a Pull Request', description: 'Submit your solution for review!', id: 2, done: true },
      { title: 'Eat!', description: 'It\'s apparently quite important', id: 3, done: false },
      { title: 'Rest!', description: 'Like eating, it seems like this is also really important', id: 4, done: false },
      { title: 'Have social life!', description: 'Ok, now we\'re just being ridiculous...', id: 5, done: true },
      { title: 'Work!', description: 'THERE\'S NOT ENOUGH TIME!', id: 6, done: false },
    ])

    return (
      <TodoList
        handleComplete={action('handleComplete')}
        handleDelete={action('handleDelete')}
        todos={state}
      />
    )
  })

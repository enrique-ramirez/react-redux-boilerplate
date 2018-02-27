import { reducer as formReducer } from 'redux-form/immutable'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux-immutable'
import { Map, fromJS } from 'immutable'

/* Resources reducers imports */
import todos, { ADD_TODO } from 'modules/ToDos/duck'
import languageProvider from 'modules/LanguageProvider/duck'

/* Utils */
export const clearReduxForm = state => (
  state
    .set('values', Map({}))
    .set(
      'fields',
      state.get('fields').map(field => field.set('touched', false)),
    )
)

/* UI reducers imports */

/* Entities reducer */
const entities = (state = fromJS({}), action) => {
  switch (action.type) {
    default: {
      if (action.entities) {
        return state.mergeDeep(action.entities)
      }

      return state
    }
  }
}

/* Resources reducer */
const resources = combineReducers({
  todos,
  languageProvider,
})

/* Input reducer */
const form = formReducer.plugin({
  addTodo: (state, action) => {
    switch (action.type) {
      case ADD_TODO.SUCCESS:
        return clearReduxForm(state)
      default:
        return state
    }
  },
})

/* UI Reducer */

/* Root Reducer */
const rootReducer = combineReducers({
  entities,
  resources,
  form,
  router: routerReducer,
})

export default rootReducer

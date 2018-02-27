import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from 'store/reducer'
import rootSaga from 'store/saga'

// This console.logs an object, not a function.
console.log(createSagaMiddleware)

// This console.logs the function we want, but only on the browser in development.
console.log(createSagaMiddleware.default)

const sagaMiddleware = createSagaMiddleware()

const configureStore = (initialState = {}, history) => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ]

  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

  const store = createStore(
    rootReducer,
    fromJS(initialState),
    composeEnhancers(applyMiddleware(...middlewares)),
  )

  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore

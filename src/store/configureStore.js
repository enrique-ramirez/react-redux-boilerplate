import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'connected-react-router/immutable'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'

import createRootReducer from 'store/reducer'
import rootSaga from 'store/saga'

const sagaMiddleware = createSagaMiddleware()

const configureStore = (
  initialState = {},
  history = createHistory(),
) => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ]

  const composeEnhancers = typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ serialize: true })
    : compose

  const store = createStore(
    createRootReducer(history),
    fromJS(initialState),
    composeEnhancers(applyMiddleware(...middlewares)),
  )

  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore

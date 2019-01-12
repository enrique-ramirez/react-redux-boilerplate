import { all } from 'redux-saga/effects'
import { todosWatchers } from 'containers/ToDos/duck'

/* eslint-disable */
export default function* rootSaga() {
  yield all([
    ...todosWatchers,
  ])
}
/* eslint-enable */

import { all } from 'redux-saga/effects'
import { todosWatchers } from 'modules/ToDos/duck'

/* eslint-disable */
export default function* rootSaga() {
  yield all([
    ...todosWatchers,
  ])
}
/* eslint-enable */

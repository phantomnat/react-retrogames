import { takeLatest } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

import { GET_GAMES } from '../constants/games'
import { getGamesSuccess, getGamesFailure } from '../actions/games'

const fetchGames = () => {
  return fetch('http://127.0.0.1:8080/games', {
    headers: new Headers({
      'Content-Type': 'application/json',
    })
  })
    .then(response => response.json())
}

function* getGames() {
  try {
    const games = yield call(fetchGames)
    yield put(getGamesSuccess(games))
  } catch (err) {
    yield put(getGamesFailure())
  }
}


function* watchGetGames() {
  yield takeLatest(GET_GAMES, getGames)
}

export {
  watchGetGames,
}

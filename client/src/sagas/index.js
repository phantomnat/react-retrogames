import { watchGetGames } from './games'

export default function* rootSaga() {
  yield [
    watchGetGames(),
  ]
}

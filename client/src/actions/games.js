import {
  GET_GAMES,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE,
  SET_SEARCH_BAR,
  SHOW_SELECTED_GAME,
} from '../constants/games'

function getGames() {
  return {
    type: GET_GAMES,
  }
}

function getGamesSuccess(games) {
  return {
    type: GET_GAMES_SUCCESS,
    games,
  }
}

function getGamesFailure() {
  return {
    type: GET_GAMES_FAILURE,
  }
}

function setSearchBar(keyword) {
  return {
    type: SET_SEARCH_BAR,
    keyword,
  }
}

function showSelectedGame(game) {
  return {
    type: SHOW_SELECTED_GAME,
    game,
  }
}
export {
  getGames,
  getGamesFailure,
  getGamesSuccess,
  setSearchBar,
  showSelectedGame,
}

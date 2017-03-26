import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import Immutable from 'immutable'
import { Modal, GamesListManager } from '../components'

import * as gamesActionCreators from '../actions/games'

class GamesContainer extends Component {
  constructor(props) {
    super(props)

    // this.state = { selectedGame: {} }

    this.toggleModal = this.toggleModal.bind(this)
    this.deleteGame = this.deleteGame.bind(this)
    this.setSearchBar = this.setSearchBar.bind(this)
  }

  componentDidMount() {
    this.getGames()
  }

  toggleModal(index) {
    // console.log(this.state.games[index])
    this.props.gamesActions.showSelectedGame(this.props.games[index])
    // this.setState({ selectedGame: this.state.games[index] })
    $('#game-modal').modal()
  }

  getGames() {
    this.props.gamesActions.getGames()

    // fetch('http://127.0.0.1:8080/games', {
    //   headers: new Headers({
    //     'Content-Type': 'application/json',
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => this.setState({ games: data }))
  }

  deleteGame(id) {
    fetch(`http://127.0.0.1:8080/games/${id}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ games: this.state.games.filter(game => game._id !== id) })
        console.log(response.msg)
      })
  }

  setSearchBar(event) {
    this.props.gamesActions.setSearchBar(event.target.value.toLowerCase())
    // this.setState({ searchBar: event.target.value.toLowerCase() })
  }

  render() {
    const { games, searchBar, selectedGame } = this.props
    console.log(games)
    return (
      <div>
        <Modal game={selectedGame} />
        <GamesListManager
          games={games}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          toggleModal={this.toggleModal}
          deleteGame={this.deleteGame}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    games: state.getIn(['games', 'list'], Immutable.List()).toJS(),
    searchBar: state.getIn(['games', 'searchBar'], ''),
    selectedGame: state.getIn(['games', 'selectedGame'], Immutable.List()).toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    gamesActions: bindActionCreators(gamesActionCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer)

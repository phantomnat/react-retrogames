import mongoose from 'mongoose'
import Game from '../models/game'
import { logger } from '../../helper/logger'

const getGames = (req, res) => {
  return Promise.coroutine(function* () {
    return yield Game.find(null, null, { sort: { postDate: 1 } })
  })()
    .then((result) => res.json(result))
    .catch((e) => {
      logger.error(e.message, e)
      return res.send(e)
    })
}

const getGame = (req, res) => {
  return Promise.coroutine(function* () {
    const { id } = req.params
    return yield Game.findById(id)
  })()
    .then((result) => res.json(result))
    .catch((e) => {
      logger.error(e.message, e)
      return res.send(e)
    })
}

const postGame = (req, res) => {
  return Promise.coroutine(function* () {
    let game = Object.assign(new Game(), req.body)

    yield game.save()

    return { msg: 'game created' }
  })()
    .then((result) => res.json(result))
    .catch((e) => {
      logger.error(e.message, e)
      return res.send(e)
    })
}

const deleteGame = (req, res) => {
  return Promise.coroutine(function* () {
    yield Game.remove({ _id: req.params.id })
    return { msg: 'successful deleted' }
  })()
    .then((result) => res.json(result))
    .catch((e) => {
      logger.error(e.message, e)
      return res.send(e)
    })
}

export { getGames, getGame, postGame, deleteGame }

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import Promise from 'bluebird'

import { logger } from './helper/logger'
import Game from './app/models/game'
import { getGames, getGame, postGame, deleteGame } from './app/routes/game'
import config from './config'

global.Promise = Promise

const app = express()
const port = config.bindPort

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
}
mongoose.Promise = global.Promise
mongoose.connect(config.mongodb.url, options)

const db = mongoose.connection
db.on('error', (e) => {
  logger.error(e.message, e)
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(express.static(`${__dirname}/client/dist`))

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.route('/games')
  .post(postGame)
  .get(getGames)
app.route('/games/:id')
  .get(getGame)
  .delete(deleteGame)

app.route('*').get((req, res) => {
  res.sendFile(`client/dist/index.html`, { root: __dirname })
})

app.listen(port)

logger.info(`listening on port: ${port}`)

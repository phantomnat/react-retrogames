// const winston = require('winston')
import winston from 'winston'
import packages from '../package.json'

winston.emitErrs = false

const optsConsole = {
  json: false,
  colorize: true,
  handleExceptions: true,
  humanReadableUnhandledException: true,
}

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  optsConsole.level = 'info'
} else {
  optsConsole.level = 'debug'
}

// logger initialize
let logger

if (process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'staging' ||
  process.env.NODE_ENV === 'develop') {
  logger = new winston.Logger({
    transports: [
      new winston.transports.Console(optsConsole),
    ],
    exitOnError: false,
  })
} else {
  logger = new winston.Logger({
    transports: [
      new winston.transports.Console(optsConsole),
    ],
    exitOnError: false,
  })
}

logger.setLevels(winston.config.syslog.levels)

const init = () => { }
const name = 'logger'

export { init, name, logger }

const merge = require('webpack-merge')
// const config = require('./config')
const PATHS = require('./webpack-paths')
const loaders = require('./webpack-loaders')

const common = {
  entry: {
    app: ['babel-polyfill', PATHS.src],
  },
  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      loaders.babel,
      loaders.css,
      loaders.font,
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}

let _config

switch (process.env.NODE_ENV) {
  case 'build':
    _config = merge(common, { devtool: 'source-map' })
    break
  case 'develop':
    _config = merge(
      common,
      { devtool: 'eval-source-map' },
      loaders.devServer({
        host: process.env.host,
        port: 3000,
      })
    )
}

module.exports = _config

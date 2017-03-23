const webpack = require('webpack')
const PATHS = require('./webpack-paths')
const path = require('path')

exports.devServer = function (opts) {
  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: opts.host,
      port: opts.port,
      contentBase: './client/dist',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}

exports.css = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
  include: PATHS.css,
}

exports.font = {
  test: /\.ttf$/,
  use: ['file-loader'],
}

exports.babel = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: ['react-hot-loader', 'babel-loader'],
  include: path.join(__dirname, 'client', 'src')
  // use: ['babel-loader'],
}

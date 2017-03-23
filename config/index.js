
module.exports = {
  bindIp: '127.0.0.1',
  bindPort: Number(process.env.PORT) || 8080,
  mongodb: {
    url: 'mongodb://127.0.0.1:27017'
  }
}

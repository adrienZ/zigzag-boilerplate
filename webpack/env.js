const path = require('path')
const urls = require('./urls')

// dev mode helpers
const serverMode = process.env.NODE_ENV === 'dev'
const devMode =
  process.env.NODE_ENV === 'dev' ||
  process.argv.indexOf('--mode=production') === -1

module.exports = Object.assign(
  {},
  {
    serverMode,
    devMode,
  }
)

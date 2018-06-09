const dotenv = require('dotenv').config().parsed
const path = require('path')
const urls = require('./urls')

// dev mode helpers
const serverMode = process.env.NODE_ENV === 'dev'
const devMode =
  process.env.NODE_ENV === 'dev' ||
  process.argv.indexOf('--mode=production') === -1

// build public path from dotenv urls
const buildPublicPath = url =>
  path.join(url, path.relative(urls.BASE_URL, urls.prod.root), '/')
const setPublicPath = () => {
  if (!devMode) return ''
  if (!serverMode) {
    return dotenv.WP_HOME || ''
  }
  return ''
}

module.exports = Object.assign({}, dotenv, {
  serverMode,
  devMode,
  publicPath: setPublicPath(),
})

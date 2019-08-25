const fs = require('fs')
const urls = require('./urls')

const js = (options = {}) => {
  const jsPath = urls.aliases['@js']
  return `${jsPath}/main`
}

// return all .ejs files at the root of /app
const views = () =>
  fs.readdirSync(urls.dev.root).filter(file => file.match(/.ejs$/))

module.exports = { js, views }

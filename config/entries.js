const fs = require('fs')

const urls = require('./urls')

// =======================================================================//
// !  CONFIG ENTRIES / SCRIPTS / BUNDLES                                  //
// =======================================================================//
const scripts = (options = {}) => {
  const jsPath = urls.aliases['@js']

  if (options.multi) {
    let SCRIPTS = {}
    fs
      .readdirSync(jsPath)
      .filter(file => file.match(/.js/))
      .map(path => {
        // all these files are now entries
        const bundle_name = path.replace('.js', '')
        SCRIPTS[`${bundle_name}_bundle`] = [`${jsPath}/${path}`]
      })
    return SCRIPTS
  }

  return { main_bundle: [`${jsPath}/main`] }
}

// =======================================================================//
// !  CONFIG VIEWS / HTML                                                 //
// =======================================================================//
const views = options =>
  fs.readdirSync(urls.dev.root).filter(file => file.match(/.twig$/))

module.exports = { scripts, views }

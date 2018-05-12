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

// List all files in a directory in Node.js recursively in a synchronous fashion
const walkSync = (dir, filelist = {}) => {
  const files = fs.readdirSync(dir)
  let resfilelist = filelist
  files.forEach((file, index) => {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      resfilelist = walkSync(dir + '/' + file + '/', resfilelist)
    } else {
      if (file.split('.')[0])
        resfilelist['to_delete/' + index + '_' + file] =
          urls.aliases['@img'] + '/' + file
    }
  })
  return resfilelist
}

const imgs = () => walkSync(urls.aliases['@img'])

// =======================================================================//
// !  CONFIG VIEWS / HTML                                                 //
// =======================================================================//
const views = () =>
  fs.readdirSync(urls.dev.root).filter(file => file.match(/.ejs$/))

module.exports = { scripts, views, imgs: imgs() }

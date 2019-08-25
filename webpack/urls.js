// =======================================================================//
// !  CONFIG URLS                                                         //
// =======================================================================//

const path = require('path')

const base_url = path.resolve(__dirname, '../')

const urls = {
  dev: {
    root: path.join(base_url, '/app/'),
    code: path.join(base_url, '/app/src/'),
    assets: path.join(base_url, '/app/assets/'),
  },
  prod: {
    root: path.join(base_url, '/dist/'),
    code: path.join(base_url, '/dist/src/'),
    assets: path.join(base_url, '/dist/assets/'),
    favicons: path.join(base_url, '/dist/icons/'),
  },
  CONFIG: __dirname,
  BASE_URL: base_url,
}

const aliases = {
  // ABSOLUTE ALIASES
  '@js': path.resolve(urls.dev.code, 'js/'),
  '@sass': path.resolve(urls.dev.code, 'sass/'),
  '@base': path.resolve(urls.dev.root),
  // RELATIVE ALIASES
  '@img': path.relative(urls.dev.root, urls.dev.assets + "/img") + "/",
  '@fonts': path.relative(urls.dev.root, urls.dev.assets + "/fonts") + "/",
}

module.exports = { ...urls, aliases }

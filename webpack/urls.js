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
  // REQUIRED ALIASES
  '@img': path.resolve(urls.dev.assets, 'img/'),
  '@js': path.resolve(urls.dev.code, 'js/'),
  '@sass': path.resolve(urls.dev.code, 'sass/'),
  // OPTIONAL ALIASES
  '@base': path.resolve(urls.dev.root),
  '@page': path.resolve(urls.dev.code, 'js/pages/'),
  '@fonts': path.resolve(urls.dev.assets, 'fonts/'),
  '@video': path.resolve(urls.dev.assets, 'video/'),
}

module.exports = { ...urls, aliases }

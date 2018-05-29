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
  },
  CONFIG: __dirname,
  BASE_URL: base_url,
}

const aliases = {
  '@base': path.resolve(urls.dev.root),
  '@js': path.resolve(urls.dev.code, 'js/'),
  '@page': path.resolve(urls.dev.code, 'js/pages/'),
  '@sass': path.resolve(urls.dev.code, 'sass/'),
  '@img': path.resolve(urls.dev.assets, 'img/'),
  '@fonts': path.resolve(urls.dev.assets, 'fonts/'),
  '@video': path.resolve(urls.dev.assets, 'video/'),
}

module.exports = { ...urls, aliases }

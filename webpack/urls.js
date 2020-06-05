// =======================================================================//
// ?  CONFIG URLS                                                         //
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

// these paths are used for our webpack congig
const aliases = {
  $js: path.resolve(urls.dev.code, 'js/'),
  $sass: path.resolve(urls.dev.code, 'sass/'),
  // $base: path.resolve(urls.dev.root),
  // $img: path.resolve(urls.dev.assets, 'img/'),
  // $fonts: path.resolve(urls.dev.assets, 'fonts/'),
  $components: path.resolve(urls.dev.code, 'components/'),
}

urls.entriesFolder = {
  js: path.relative(urls.dev.root, aliases.$js),
  fonts: path.relative(urls.dev.root, path.resolve(urls.dev.assets, 'fonts/')),
  img: path.relative(urls.dev.root, path.resolve(urls.dev.assets, 'img/')),
}

module.exports = {
  ...urls,
  aliases,
}

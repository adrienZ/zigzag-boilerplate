const OfflinePlugin = require('offline-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const path = require('path')

const urls = require('./urls')
const config = require('./config')
const entries = require('./entries')
const env = require('./env')

const manifestOptions = {
  icons: {
    src: `./${path.relative(urls.BASE_URL, urls.dev.root)}/favicon.png`,
    sizes: [96, 128, 192, 256, 384, 512], // multiple sizes,
    destination: path.relative(urls.prod.root, urls.prod.favicons),
  },
  theme_color: config.THEME_COLOR || config.BACKGROUND_COLOR,
  ios: true,
  filename: 'manifest.json',
  name: config.APP_TITLE,
  short_name: config.APP_TITLE,
  start_url: '.',
  orientation: 'portrait',
  inject: true,
  fingerprints: true,
  display: 'standalone',
  background_color: config.BACKGROUND_COLOR || config.THEME_COLOR,
}

const pwaManifest = new WebpackPwaManifest(manifestOptions)

const serviceWorker = new OfflinePlugin({
  excludes: ['**/*.map', '**/*.gz'],
  externals: entries.views().map(v => v.replace('.ejs', '.html')),
  responseStrategy: 'cache-first',
  autoUpdate: false,
  ServiceWorker: {
    events: true,
    output: 'sw.js',
    entry: urls.dev.code + 'js/sw.js',
    minify: !env.development,
  },

  AppCache: false,
})

module.exports = [pwaManifest].concat([serviceWorker])

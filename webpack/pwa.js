const OfflinePlugin = require('offline-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const path = require('path')

const urls = require('./urls')
const config = require('./config')
const entries = require('./entries')

const freeOptions = {
  icons: {
    src: `./${path.relative(urls.BASE_URL, urls.dev.root)}/favicon.png`,
    sizes: [96, 128, 192, 256, 384, 512], // multiple sizes,
    destination: path.relative(urls.prod.root, urls.prod.favicons) + '/pwa/',
  },
  theme_color: config.THEME_COLOR || config.BACKGROUND_COLOR,
  ios: true,
  filename: config.features.pwa ? 'manifest.json' : ' ',
}

const premiumOptions = {
  name: config.APP_TITLE,
  short_name: config.APP_TITLE,
  start_url: '.',
  orientation: 'portrait',
  inject: true,
  fingerprints: true,
  display: 'standalone',
  background_color: config.BACKGROUND_COLOR || config.THEME_COLOR,
}

const pwaOptions = Object.assign(
  {},
  freeOptions,
  config.features.pwa ? premiumOptions : {}
)

const pwaManifest = new WebpackPwaManifest(pwaOptions)

const offline = new OfflinePlugin({
  excludes: ['**/*.map', '**/*.gz'],
  externals: entries.views().map(v => v.replace('.ejs', '.html')),
  ServiceWorker: {
    events: true,
  },

  AppCache: true,
})

module.exports = [pwaManifest].concat(config.features.pwa ? [offline] : [])

const OfflinePlugin = require('offline-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const path = require('path')

const urls = require('./urls')
const env = require('./env')
const entries = require('./entries')

const pwaManifest = new WebpackPwaManifest({
  // MANIFEST VALUES
  name: env.APP_TITLE,
  short_name: env.APP_TITLE,
  start_url: '.',
  orientation: 'portrait',
  display: 'standalone',
  background_color: env.BACKGROUND_COLOR || env.THEME_COLOR,
  icons: {
    src: `./${path.relative(urls.BASE_URL, urls.dev.root)}/favicon.png`,
    sizes: [96, 128, 192, 256, 384, 512], // multiple sizes,
    destination: path.relative(urls.prod.root, urls.prod.favicons) + '/pwa/',
  },
  theme_color: env.THEME_COLOR || env.BACKGROUND_COLOR,

  // MANIFEST OPTIONS
  ios: true,
  inject: true,
  // filename: 'manifest.json',
})

// TODO: COMPARE WITH WORKBOX
const offline = new OfflinePlugin({
  excludes: ['**/*.map', '**/*.gz'],
  externals: entries.views().map(v => v.replace('.ejs', '.html')),
  ServiceWorker: {
    events: true,
  },

  AppCache: false,
})

module.exports = [offline, pwaManifest]

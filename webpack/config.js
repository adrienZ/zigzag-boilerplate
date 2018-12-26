const features = {
  pwa: false,
  analytics: false,
}

// webpack-dev-server settings
// local ip is useful for testing responsive with webpack-dev-server since you can share an url
const DEV_SERVER_LOCAL_IP = false
const DEV_SERVER_PORT = 8899
const DEV_SERVER_HTTPS = false
const DEV_SERVER_HMR = true

// PWA
// also page title
const APP_TITLE = '👋 Give me a title 🔥'
const APP_DESCRIPTION = 'My super website'
const THEME_COLOR = '#fff'
// splashscreen color
const BACKGROUND_COLOR = '#fff'

module.exports = {
  DEV_SERVER_LOCAL_IP,
  DEV_SERVER_PORT,
  DEV_SERVER_HTTPS,
  DEV_SERVER_HMR,

  APP_TITLE,
  APP_DESCRIPTION,
  THEME_COLOR,
  BACKGROUND_COLOR,

  features,
}

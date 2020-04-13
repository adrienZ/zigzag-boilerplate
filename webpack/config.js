const features = {
  pwa: false,
  analytics: false,
}

const compatibility = {
  useBuiltIns: "usage",

  // https://babeljs.io/docs/en/babel-preset-env#targets
  // https://browserl.ist/
  targets: {
    browsers: "cover 99.5%, not dead"
  }
}

// webpack-dev-server settings
// local ip is useful for testing responsive with webpack-dev-server since you can share an url
const DEV_SERVER_LOCAL_IP = true
const DEV_SERVER_PORT = 8899
const DEV_SERVER_HTTPS = false
const DEV_SERVER_HMR = false

// PWA
// also page title
const THEME_COLOR = '#fff'
// splashscreen color
const BACKGROUND_COLOR = '#fff'

module.exports = {
  DEV_SERVER_LOCAL_IP,
  DEV_SERVER_PORT,
  DEV_SERVER_HTTPS,
  DEV_SERVER_HMR,
  THEME_COLOR,
  BACKGROUND_COLOR,

  compatibility,
  features,
}
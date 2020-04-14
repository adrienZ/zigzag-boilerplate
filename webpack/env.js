process.env.NODE_ENV = process.env.NODE_ENV || 'production'

module.exports = {
  webpack_server: !!process.env.WEBPACK_DEV_SERVER,
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
}

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

module.exports = {
  webpack_server: !!process.env.WEBPACK_DEV_SERVER,
  developement: process.env.NODE_ENV === 'developement',
  production: process.env.NODE_ENV === 'production',
}

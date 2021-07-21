const withCSS = require('@zeit/next-css')

module.exports = withCSS()

module.exports = {
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true
  },
  env: {
    HOST: process.env.HOST,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    PUBLIC_URL: process.env.PUBLIC_URL,
    PORT: process.env.PORT,
    HOSTNAME: process.env.HOSTNAME,
    HOST: process.env.HOST,
    WSHOST: process.env.WSHOST
  }
}

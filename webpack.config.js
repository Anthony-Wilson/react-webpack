let devConfig = require('./config/webpack.config.dev')
let prodConfig = require('./config/webpack.config.prod')
let ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
// 开发环境
if( ENV == 'development' ) {
  module.exports = devConfig
} else {
  module.exports = prodConfig
}
let config = require('./config/webpack.config.base')
let devServer = require('./config/webpack.config.dev')
let ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
// 开发环境
if( ENV == 'development' ) {
  config.devServer = devServer
} else {

}

module.exports = config
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },{
        test: /\.(sass|scss)$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  devServer: {
    port: '3000',
    host: '0.0.0.0',
    hot: true,
    compress: true,
    inline: true,
    // 自动打开默认浏览器
    // open: true,
    stats: 'errors-only',
    // quiet: true
  }
})
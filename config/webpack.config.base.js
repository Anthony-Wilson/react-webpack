const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')

const bundleHtml = new HtmlPlugin({
  title: 'react-webpack',
  favicon: './images/favicon.ico',
  minify: {
    removeAttributeQuotes: true
  },
  template: './index.html'
})

let config = {
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : "development",
  entry: './index.js',
  output: {
    filename: 'js/index.bundle.js',
    path: path.resolve(__dirname, '../dist'),
    // publicPath: './dist/'
  },
  // stats: 'none',
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            name: `[name]-[hash].[ext]`
          }
        }
      }, {
        test: /\.(js|jsx)/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    bundleHtml
  ]
}

module.exports = config;
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

const extractCss = new ExtractTextPlugin({
  filename: "css/[name].css",
  disable: process.env.NODE_ENV === "development"
})
const extractSass = new ExtractTextPlugin({
  filename: "css/[name].css",
  disable: process.env.NODE_ENV === "development"
});
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
        test: /\.css$/,
        use: extractCss.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },{
        test: /\.(sass|scss)$/,
        use: extractSass.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
          // 在开发环境使用 style-loader
          fallback: "style-loader",
          // publicPath: 'css'
      })
      },{
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
    extractSass,
    bundleHtml
  ]
}

module.exports = config;
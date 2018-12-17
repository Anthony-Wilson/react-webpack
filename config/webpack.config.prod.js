const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCss = new ExtractTextPlugin({
  filename: "css/[name].css",
  disable: process.env.NODE_ENV === "development"
})
const extractSass = new ExtractTextPlugin({
  filename: "css/[name].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = merge(baseConfig, {
  devtool: 'source-map',
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
            fallback: ["style-loader"]
        })
      }
    ]
  },
  plugins: [
    extractCss,
    extractSass
  ]
})
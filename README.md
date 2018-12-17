# 一次关于webpack与react结合的伟大实验
下面是在配置`webpack4` `react16.6.3`的时候遇到的一些问题，不过最终终于解决

因为基本上没有怎么弄过webpack所以一切都是重头来过

## 问题一：webpack的基本配置
webpack的所有的配置都是配置在一个名为`webpack.config.js`的文件中，这个文件**必须**放在项目的根目录，具体包含项目的入口，出口，loaders，插件以及热更新。具体的配置可以按照[webpack官网](https://webpack.docschina.org/concepts/)进行设置，主要的问题就是loader的配置，插件的使用，以及开发环境与生产环境的配置搭建

### loader的使用
按照我的理解，loader相当于一个解释器，用于解释一个语法糖。

这里需要简单的说明一下webpack的打包模式，webpack打包基本都是将你所有的代码打包到一个`js`文件，这个文件就是你的webpack配置文件里面的`outpute`属性，下面就是本项目的配置
```
output: {
  filename: 'js/index.bundle.js',
  path: path.resolve(__dirname, '../dist'),
  // publicPath: './dist/'
},
```
因为所有的代码都是打包到一个JS文件里面，但是你在使用css等语法的时候如果将css打包到JS里面可能无法识别，这个时候就需要就行解析。比如说`css-loader`就是解释`css`语法的。在你使用一个语法的时候都是需要进行解析的，具体的loader可以查看[webpack loaders](https://webpack.docschina.org/loaders/)。

loader具体写在哪里呢？

loader写在webpack配置文件里面的`module`属性里面，不同版本的webpack对loader的配置是不同的，在webpack 3.0以后都是放在了`rules`里面。下面是loader的具体写法
```
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
}
```
具体的每一项就是`test`匹配文件后缀，`use`就是使用哪一个loader，每一个loader都可以配置具体的属性，例如上面的`file-loader`，具体的属性可以去[npm](https://www.npmjs.com/)上查看具体的说明

### 插件的使用
插件也是一个很有用的东西，比如loader中的`extractCss`与`extractSass`就是使用的插件，他的作用就是将打包到JS里面的css样式文件提取出来
```
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
```
plugin的配置,在webpack配置文件的`plugins`属性里面，是一个数组
```
plugins: [
  new webpack.HotModuleReplacementPlugin(),
  extractSass,
  bundleHtml
]
```
每一个插件的用法也是不同，需要到具体的网站上面去寻找答案

### 开发环境与生产环境
webpack可以配置不同的环境，配置项中有一个`mode`属性就是这个，当时一般不怎么使用这个
```
mode: process.env.NODE_ENV ? process.env.NODE_ENV : "development",
```
具体的还是需要看配置。比如上面的css提前插件中，有一个`disable`属性就是这个用处，如果是开发环境就不用进行提取了。在`config`文件夹中的单个webpack就是对webpack配置的分离，根目录的`webpack.config.js`在根据具体的环境进行具体的使用。当前处于哪个环境可以更加nodejs的全局变量`process`确定。`process.env.NODE_ENV`的值就是当前的环境，有两个，一个是`production`，另一个是`development`。

这里需要说明的是如何配置`webpack.config.js`

最开始我是把`extract-text-webpack-plugin`配置在`webpack.config.js`中。但是这样在更新css样式的时候是不会触发webpack的热更新的，所以这种写法不正确。那么就需要单独的配置。不同的环境采用不同的配置方法。但是问题来了，如果开发环境与生产环境不同的只有一点点，那么不可能全部都重新写一遍。如果配置少还可以。所以这里就需要把基本的配置（相同的配置）写在一个基本的配置文件里面，这里是`config`文件夹下面的`webpack.config.base.js`，让后在`webpack.config.dev.js`和`webpack.config.prod.js`里面将需要的配置合并起来。最开始我试过自己合并，但是会有问题，所以这里推荐使用[webpack-merge插件](`https://www.npmjs.com/package/webpack-merge`)

具体的使用
```
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
```
需要注意的是：**webpack的配置文件里面的引用模块文件需要使用ES5的require语法，而不要使用ES6的import语法**

按理说webpack还应该配置一个供测试人员测试的环境`webpack.config.test.js`。这里就不在进行处理说明。

## 问题二：在使用babel-loader的时候总是报错
### SyntaxError: /Users/anthony/Documents/MyText/react-webpack/index.jsx: Unexpected token (10:11)

这个是因为在`.babelrc`的预设中我只设置了一下的内容
```
{
  "presets": [
    "@babel/preset-env"
  ],
  "ignore": []
}
```
而正确的还需要加上对react语法的处理，所以我安装了`babel-preset-react`

但是在这样配置了以后
```
{
  "presets": [
    "baber-preset-react",
    "@babel/preset-env"
  ],
  "ignore": []
}
```
就出现了以下问题

### Plugin/Preset files are not allowed to export objects, only functions
这里抱着错误是因为 babel 的版本冲突。多是因为你的 babel 依赖包不兼容。

可以查看你的 package.json 的依赖列表
即有 babel 7.0 版本的( @babel/core ， @babel/preset-env )

也可命令查看 bebel-cli 的版本 （ babel -V ）

也有 babel 6.0 版本的 ( babel-core@6.26.0 , babel-cli@6.26.0 , babel-preset-react@6.24.1 )

`如果在你的 package.json 依赖包中既有 babel 7.0 版本，又有 babel 6.0 版本，就会报这个错误`

很现实就是两个版本是不兼容的

解决方法就是统统都使用7.0版本的，所以安装了`@babel/preset-react`,配置如下
```
{
  "presets": [
    "@babel/react",
    "@babel/preset-env"
  ],
  "ignore": []
}
```
预设的版本都必须是要与babel-core的版本统一

### As of v7.0.0-beta.55, we've removed Babel's Stage presets.
这个是因为从babel v7.0.0-beta.55 版本开始已经移除了`@babel/preset-stage-0`的预设
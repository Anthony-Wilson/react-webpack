## 问题一：在使用babel-loader的时候总是报错
1. SyntaxError: /Users/anthony/Documents/MyText/react-webpack/index.jsx: Unexpected token (10:11)

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
就出现了`问题2`

2. Plugin/Preset files are not allowed to export objects, only functions
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

3. As of v7.0.0-beta.55, we've removed Babel's Stage presets.
这个是因为从babel v7.0.0-beta.55 版本开始已经移除了`@babel/preset-stage-0`的预设

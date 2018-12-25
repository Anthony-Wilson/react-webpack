# react-router
关于在使用`react-router 4及以上`版本的时候常常会出现一些错误，和最开始的时候使用的不同。常见的错误如下
## The prop `history` is marked as required in `Router`, but its value is `undefined`
这个是因为在使用的时候不能直接这样引入模块
```
import {Router, Route, Link} from 'react-router'
```

上面有两处错误，第一个是`4.0`以后的版本**不在使用**`react-router`，而是改为使用`react-router-dom`。这个是专门用来处理PC端的库，如果是处理`react-native`，那么就使用`react-router-native`库。第二个错误是在使用`react-router-dom`4.0以上版本的时候不能直接引用模块，需要这样
```
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
```
前面需要加上**BrowserRouter**

## Cannot read property 'location' of undefined
这个错误也是因为没有使用`react-router-dom`导致的

## 关于切换路由后主页的内容始终存在的问题
这个是由于我们在设置路由的时候
```
<Route path='/' component={Home}/>
<Route path='/desc' component={Desc}/>
<Route path='/us' component={Us}/>
```
这样设置的。此时如果需要让首页的内容在其他的路由上面不显示，需要在首页路由即`<Route path='/' component={Home}/>`上面添加一个属性`exact`，即`<Route exact path='/' component={Home}/>`。这样就可以了。具体可以看[exact](https://reacttraining.com/react-router/web/api/Route/exact-bool)。具体的说法是：exact控制匹配到`/`路径时不会再继续向下匹配。react-route的基本的使用教程可以查看[React-router4简约教程](http://react-china.org/t/react-router4/15843)
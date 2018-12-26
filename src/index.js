import React, { PureComponent } from 'react'
import Mock from 'mockjs'

var Random = Mock.Random
var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      'email': '@email',
      'color': '@color',
      'name': '@name',
      'date': '@date',
      'time': '@time',
      'image': Random.image('200x100', Random.color(), 'Hello'),
      // 'image2': '@image("100x250")'
  }]
})
// 输出结果
console.log(JSON.stringify(data, null, 2))

export default class Index extends PureComponent {
  render() {
    return (
      <div>
        123
      </div>
    )
  }
}

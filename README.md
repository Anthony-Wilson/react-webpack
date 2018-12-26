# mockjs的使用
[mockjs](https://github.com/nuysoft/Mock/wiki/Syntax-Specification)使用文档


## 数据模板定义规范 DTD(Data Template Definition)
```
# 数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：
// 属性名   name
// 生成规则 rule
// 属性值   valuev
'name|rule': value
```
**注意：**
![注意事项](https://raw.githubusercontent.com/Anthony-Wilson/PicGo/master/20181226113830.png)

具体每一项的规则以及对应于不同的值得时候表示的意思是不同的。
具体查看[生成规则和示例](https://github.com/nuysoft/Mock/wiki/Syntax-Specification)

## 数据占位符定义规范 DPD(Data Placeholder Definition)
```
# 占位符 只是在属性值字符串中占个位置，并不出现在最终的属性值中。

@占位符
@占位符(参数 [, 参数])
```

**注意**
![占位符](https://raw.githubusercontent.com/Anthony-Wilson/PicGo/master/20181226115258.png)
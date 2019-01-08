## easy-css-loader

![](https://img.shields.io/badge/easy--css--loader-1.0.0-blue.svg)


## 介绍

`easy-css-loader` 是一款`webpack`的`loader`, 集成一些`css`代码块功能

 
## 效果图

<img src="http://ww1.sinaimg.cn/mw690/b44313e1gy1fyz3zjbwjkj20tn0kn404.jpg" width="600" height="400"/>
对应代码:</br>

```html
<div>
  <div class="easy-css"></div>
</div>
<style >
  .easy-css{
    border: 1px solid red;
    wh(100px, 80px);
    posC;
  }
</style>
```

## 使用文档
### 配置

1. npm install -D easy-css-loader
2. 修改`webpack`配置文件(以`vue`为例)
```js
{
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader', 'easy-css-loader']
      }
    ]
  }
}
```

### wh

```html
<style >
  .easy-css{
    wh(100px, 80px);
  }
</style>
<!-- 相当于 -->
<style >
  .easy-css{
    width: 100px;
    height: 80px;
  }
</style>
```

### font

```html
<style >
  .easy-css{
    font(20px, yellow, center);
  }
</style>
<!-- 相当于 -->
<style >
  .easy-css{
    font-size: 20px;
    color: yellow;
    text-align: center;
  }
</style>
```

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

1. `npm install -D easy-css-loader`
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


### flex

```html
<style >
  .easy-css{
    flex;  
  }
</style>
<!-- 相当于(也可以往flex(left, flex-start);) -->
<style >
  .easy-css{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
```



### posC

```html
<style >
  .easy-css{
    posC;
  }
</style>
<!-- 相当于 -->
<style >
  .easy-css{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
</style>
```


### posL

```html
<style >
  .easy-css{
    posL;
  }
</style>
<!-- 相当于 -->
<style >
  .easy-css{
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translate3d(0, -50%, 0);
  }
</style>
```


### posR

```html
<style >
  .easy-css{
    posR;
  }
</style>
<!-- 相当于 -->
<style >
  .easy-css{
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translate3d(0, -50%, 0);
  }
</style>
```


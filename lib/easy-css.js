/**
 * @author liuyangjike
 * Date: 2019/1/11
 */

/**
 * @param {*} fontStr 待解析字符串的`font(..)`
 * @returns 解析完css字体样式
 */
function fontParse(fontStr) {
  let start = fontStr.indexOf('(') + 1
  let args = fontStr.slice(start, -1)
  let argsList = args.split(',')
  switch (argsList.length) {
    case 2:
      argsList.push('left')
      break
    case 1:
      argsList.push('#000', 'left')
      break
  }
  cssName = ['font-size', 'color', 'text-align'].map((item, index) => {
    return `${item}:${argsList[index]}`
  })
  let cssStr = cssName.join(';')
  return cssStr
}

/**
 * @param {*} whStr 待解析字符串的`wh(..)`
 * @returns 解析完css长宽样式
 */
function whParse(whStr) {
  let start = whStr.indexOf('(') + 1
  let args = whStr.slice(start, -1)
  let argsList = args.split(',')
  cssName = ['width', 'height'].map((item, index) => {
    return `${item}:${argsList[index]}`
  })
  let cssStr = cssName.join(';') + ';'
  return cssStr
}

/**
 * @param {*} posCStr 待解析字符串的`posC`
 * @returns 解析完css居中样式
 */
function posCParse(posCStr) {
  let start = posCStr.indexOf('(') + 1
  let args = start? posCStr.slice(start, -2): 'absolute'
  let cssStr = [
    `position: ${args}`,
    `top: 50%`,
    `left: 50%;`,
    `transform: translate3d(-50%, -50%, 0)`
  ].join(';') + ';'
  return cssStr
}

/**
 * @param {*} posLRStr 待解析字符串的`posLRStr(..)`, type可选`left``right`
 * @returns 解析完css居左或居右样式
 */
function posLRParse(posLRStr, type) {
  let start = posLRStr.indexOf('(') + 1
  let end = posLRStr.indexOf(')')
  let innerText = posLRStr.substring(start, end)
  let argsList = ['50%']
  let common = ['absolute', '30px', 'translate3d(0, -50%, 0)']
  innerText = innerText.replace(/\s+/g, "")
  if (!innerText) {
    argsList.push(...common)
  } else {
    let args = posLRStr.slice(start, -2)
    let list = args.split(',')
    if(list.length === 2) {
      argsList.push(list[0], list[1], common[2])
    } else {
      argsList.push(list[0], common[1], common[2])
    }
  }
  cssName = ['top', 'position', type, 'transform'].map((item, index) => {
    return `${item}:${argsList[index]}`
  })
  cssStr = cssName.join(';') + ';'
  return cssStr
}

/**
 * @param {*} flexStr 待解析字符串的`flex(..)`,
 * @returns 解析完css flex布局样式
 */
function flexParse(flexStr) {
  let start = flexStr.indexOf('(') + 1
  let end = flexStr.indexOf(')')
  let innerText = flexStr.substring(start, end)
  let argsList = ['flex']
  innerText = innerText.replace(/\s+/g, "")
  if (!innerText) {
    argsList.push('center', 'center')
  } else {
    let args = flexStr.slice(start, -2)
    let list = args.split(',')
    if(list.length === 2) {
      argsList.push(list[0], list[1])
    } else {
      argsList.push(list[0], 'center')
    }
  }
  cssName = ['display', 'justify-content', 'align-items'].map((item, index) => {
    return `${item}:${argsList[index]}`
  })
  cssStr = cssName.join(';') + ';'
  return cssStr
}


/**
 * @param {*} comBStr 待解析字符串的`comB(..)`
 * @returns 解析完css背景样式
 */
function backParse(comBStr) {
  let start = comBStr.indexOf('(') + 1
  let end = comBStr.indexOf(')')
  let args = comBStr.substring(start, end)
  let cssStr = [
    `background: url("${args}") no-repeat center`,
    `background-size: 100%`
  ].join(';') + ';'
  return cssStr
}


module.exports = function (content) {  // content 获取App.css的内容或者你用<style>..</style>里面的内容
  content = content.replace(/font\((.|\n)*?\)/ig, (str) => fontParse(str))  // 解析font()字体样式
                    .replace(/wh\((.|\n)*?\)/ig, (str) => whParse(str))  // 解析wh()宽高样式
                      .replace(/posC(.|\n)*?;/ig, (str) => posCParse(str))  // 解析posC居中样式
                          .replace(/flex(.|\n)*?;/ig, (str) => flexParse(str))  // 解析flex布局样式
                            .replace(/comB(.|\n)*?;/ig, (str) => backParse(str))  // 解析comB(..)背景图片样式
                              .replace(/posL(.|\n)*?;/ig, (str) => posLRParse(str, 'left')) // 解析posL(..)居左样式
                                .replace(/posR(.|\n)*?;/ig, (str) => posLRParse(str, 'right'))  // 解析posR(..)居右样式
  this.cacheable()  // 缓存
  this.callback(null, content)  // 回调
}
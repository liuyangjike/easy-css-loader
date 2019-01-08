const {getOptions} = require('loader-utils')
// const validateOptions = require('schema-utils')
// const chalk = require('chalk')


const schema = {
  type: 'object',
  properties: {
    remUnit: {
      type: 'number'
    },
    forcePxProperty: {
      type: 'array'
    }
  }
}

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

function flexParse(flexStr) {
  let start = flexStr.indexOf('(') + 1
      let argsList = ['flex']
      switch (flexStr) {
        case 'flex;':
          argsList.push('center', 'center')
          break
        case 'flex();':
          argsList.push('center', 'center')
          break
        default:
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

module.exports = function (source) {
  const options = getOptions(this)
  // validateOptions(schema, options, 'easy-css')
  source = source.replace(/<style(.|\n)*?<\/style>/ig, function (content) {
    content = content.replace(/font\((.|\n)*?\)/ig, (str) => fontParse(str))
    content = content.replace(/wh\((.|\n)*?\)/ig, (str) => whParse(str))
    content = content.replace(/posC(.|\n)*?;/ig, (str) => posCParse(str))
    content = content.replace(/flex(.|\n)*?;/ig, (str) => flexParse(str))
    return content
  })
  this.cacheable()
  this.callback(null, source)
}
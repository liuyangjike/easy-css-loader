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

module.exports = function (source) {
  const options = getOptions(this)
  // validateOptions(schema, options, 'easy-css')
  source = source.replace(/<style(.|\n)*?<\/style>/ig, function (content) {

    content = content.replace(/font\((.|\n)*?\)/ig, function(wh) {
      let start = wh.indexOf('(') + 1
      let args = wh.slice(start, -1)
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
    })
    content = content.replace(/wh\((.|\n)*?\)/ig, function(wh) {
      let start = wh.indexOf('(') + 1
      let args = wh.slice(start, -1)
      let argsList = args.split(',')
      cssName = ['width', 'height'].map((item, index) => {
        return `${item}:${argsList[index]}`
      })
      let cssStr = cssName.join(';') + ';'
      return cssStr
    })
    content = content.replace(/posC(.|\n)*?;/ig, function(wh) {
      let start = wh.indexOf('(') + 1
      let args = start? wh.slice(start, -2): 'absolute'
      let cssStr = [
        `position: ${args}`,
        `top: 50%`,
        `left: 50%;`,
        `transform: translate3d(-50%, -50%, 0)`
      ].join(';') + ';'
      return cssStr
    })
    content = content.replace(/flex(.|\n)*?;/ig, function(wh) {
      let start = wh.indexOf('(') + 1
      let argsList = ['flex']
      switch (wh) {
        case 'flex;':
          argsList.push('center', 'center')
          break
        case 'flex();':
          argsList.push('center', 'center')
          break
        default:
          let args = wh.slice(start, -2)
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
    })
    return content
  })
  this.cacheable()
  this.callback(null, source)
}
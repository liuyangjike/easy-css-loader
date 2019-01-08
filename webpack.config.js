const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')


module.exports = {
  entry: './example',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js', //指定vue版本
    },
    extensions: ['*', '.js', '.json', '.vue']   // 引入文件时候可以省略后缀
  },
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 8000,
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.vue$/,
        use: [
          //'vue-loader', 'easy-css-loader'
          {
            loader: 'vue-loader'
          },
          {
            loader: path.join(__dirname, './lib/easy-css.js'),
          }
        ]
      },
      {
        test: /\.css$/,     // 解析css, 包括.vue里面的style里的css
        use: ['vue-style-loader', 'css-loader'] // 从右向左解析
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
  ]
}
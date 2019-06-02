const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './ClientCode/main.js',
  output: {
    path: path.resolve(__dirname, './wwwroot/js'),
    publicPath: '/wwwroot/',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/u,
        loader: 'vue-loader'
      },
      {
        test: /\.styl$/u,
        loader: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/u,
        loader: [
          'vue-style-loader',
          'css-loader'
        ],
        exclude: /node_modules/u
      },
      {
        test: /\.js$/u,
        loader: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /node_modules/u
      },
      {
        test: /\.(png|jpg|gif|svg)$/u,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  }
};

const path = require('path'),
 {VueLoaderPlugin} = require('vue-loader')

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
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.css$/u,
        loader: 'css-loader'
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

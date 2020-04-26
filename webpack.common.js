const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
  entry: "./FrontEnd/main.js",
  output: {
    path: path.resolve(__dirname, "./wwwroot/js"),
    publicPath: "/wwwroot/",
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/u,
        use: [
          {
            loader: "vue-loader"
          }
        ]
      },
      {
        test: /\.svg$/u,
        use: [
          "babel-loader",
          "vue-svg-loader"
        ]
      },
      {
        test: /\.styl$/u,
        loader: [
          "style-loader",
          "css-loader",
          "stylus-loader"
        ]
      },
      {
        test: /\.css$/u,
        loader: [
          "vue-style-loader",
          "css-loader"
        ],
        exclude: /node_modules/u
      },
      {
        test: /\.s(c|a)ss$/u,
        loader: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.js$/u,
        loader: [
          "babel-loader",
          "eslint-loader"
        ],
        exclude: /node_modules/u
      },
      {
        test: /\.(png|jpg|gif|ico)$/u,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf)$/u,
        loader: "url-loader"
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js"
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

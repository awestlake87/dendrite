var webpack = require("webpack")
var path = require("path")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var BUILD_DIR = path.resolve(__dirname, "public")
var APP_DIR = path.resolve(__dirname, "src/client")

module.exports = {
  entry: [
    "babel-polyfill",
    APP_DIR + "/index.jsx"
  ],
  output: {
    path: BUILD_DIR,
    filename: "bundle.js",
  },
  devServer: {
    contentBase: BUILD_DIR,
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1 },
            },
            "postcss-loader"
          ]
        })
      },
      {
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "src")
        ],
        test: /\.jsx?$/,
        query: {
          plugins: [ "transform-decorators-legacy", "transform-runtime" ],
          presets: [ "es2015", "stage-0", "react" ]
        }
      }
    ]
  },
  resolve: {
    extensions: [ ".js", ".jsx", ".json" ]
  },
  plugins: [ new ExtractTextPlugin("[name].bundle.css") ]
}

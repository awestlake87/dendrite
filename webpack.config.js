var webpack = require("webpack")
var path = require("path")

var BUILD_DIR = path.resolve(__dirname, "src/client/public")
var APP_DIR = path.resolve(__dirname, "src/client/app")

module.exports = {
  entry: [
    "babel-polyfill",
    APP_DIR + "/index.jsx"
  ],
  output: {
    path: BUILD_DIR,
    filename: "bundle.js",
  },
  module: {
    loaders: [
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
  }
}

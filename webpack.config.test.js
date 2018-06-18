const config = require("./webpack.config.dev")
const webpack = require("webpack")
const {omit} = require("lodash")

module.exports = {
  ...omit(config, "entry"),
  target: "node",
  devServer: omit(config.devServer, "host", "port"),
  plugins: config.plugins.concat(
    new webpack.DefinePlugin({
      window: "global" // Because there is no window object in Node
    })
  )
}

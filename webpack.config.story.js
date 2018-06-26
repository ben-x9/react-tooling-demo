const config = require("./webpack.config.dev.js")
const path = require("path")
function absPath(filePath) {
  return path.join(__dirname, filePath)
}

module.exports = {
  ...config,
  entry: {
    bundle: ["react-hot-loader/patch", absPath("storybook/run.tsx")]
  },
  resolve: {
    modules: [...modules, path.resolve("./storybook")]
  },
  devServer: {
    ...config.devServer,
    port: 9991
  }
}

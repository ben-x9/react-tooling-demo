const path = require("path")
const webpack = require("webpack")
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")

function absPath(filePath) {
  return path.join(__dirname, filePath)
}

module.exports = {
  entry: {
    bundle: ["react-hot-loader/patch", absPath("src/index.ts")]
  },
  output: {
    path: path.join(__dirname, "web"),
    filename: "[name].js"
  },
  resolve: {
    modules: [path.resolve("./src"), path.resolve("."), "node_modules"],
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    symlinks: false
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development"
    }),
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    host: "0.0.0.0",
    contentBase: absPath("web"),
    port: 9999,
    hotOnly: true,
    historyApiFallback: true,
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "react-hot-loader/webpack"
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          }
        ]
      },
      {
        test: /\.jsonc$/,
        use: "raw-loader"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
}

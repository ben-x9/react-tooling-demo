const config = require("./webpack.config.dev.js")
const path = require("path")
const webpack = require("webpack")
const CompressionPlugin = require("compression-webpack-plugin")
const omit = require("lodash/omit")

module.exports = {
  ...omit(config, "devtool"),
  entry: {
    bundle: config.entry.bundle.filter(it => it !== "react-hot-loader/patch")
  },
  output: {
    path: path.join(__dirname, "web"),
    filename: "[name].js"
  },
  plugins: [
    ...config.plugins.slice(1),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production"
    }),
    // For react please read https://reactjs.org/docs/optimizing-performance.html#use-the-production-build
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false // remove comments
        },
        compress: {
          unused: true,
          dead_code: true, // big one--strip code that will never execute
          warnings: false, // good for prod apps so users can't peek behind curtain
          drop_debugger: true,
          conditionals: true,
          evaluate: true,
          drop_console: true, // strips console statements
          sequences: true,
          booleans: true
        }
      }
    })
    // Firebase hosting gzips on upload
    /*new CompressionPlugin({
      asset: "bundle.js",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })*/
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: false,
          compilerOptions: {
            noEmit: false,
            sourceMap: false
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader?minimize&{discardComments:{removeAll:true}}" // translates CSS into CommonJS
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
            loader: "css-loader?minimize&{discardComments:{removeAll:true}}" // translates CSS into CommonJS
          }
        ]
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

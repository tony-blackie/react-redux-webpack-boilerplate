const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const packageJson = require('./package.json')
const config = packageJson.config.production

const extractAppCss = new ExtractTextPlugin(config.css.appBundle)
const extractVendorCss = new ExtractTextPlugin(config.css.vendorBundle)

module.exports = {
  devServer: {
    open: true,
    host: config.server.host,
    port: config.server.port,
    hot: false,
    inline: true,
    compress: true
  },
  entry: {
    app: config.entry
  },
  output: {
    path: config.distDir,
    filename: config.js.appBundle,
    publicPath: config.publicPath
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          plugins: [
            'transform-object-rest-spread',
            'transform-es2015-modules-commonjs',
            'transform-class-properties'
          ]
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: extractAppCss.extract('css?autoprefixer&minimize!postcss!less')
      },
      {
        test: /\.css$/,
        loader: extractVendorCss.extract('css?minimize')
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg(\?v=\w+))$/,
        exclude: /node_modules/,
        loader: `file?name=${config.statics.fonts}`
      },
      {
        test: /\.(png|svg)$/,
        loader: `url?limit=${config.statics.urlLimit}&name=${config.statics.images}&outputPath=${config.distDir}`
      }
    ]
  },
  postcss: function () {
    return [autoprefixer]
  },
  svgoConfig: {
    plugins: [
      { removeTitle: true },
      { convertColors: { shorthex: false } },
      { convertPathData: false }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CleanWebpackPlugin(config.cleanDirs, {
      root: __dirname,
      verbose: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: config.js.vendorBundle,
      minChunks: module => isVendor(module)
    }),
    extractAppCss,
    extractVendorCss,
    new HtmlWebpackPlugin({
      template: config.htmlEntry,
      minify: { collapseWhitespace: true }
    })
  ]
}

function isVendor (module) {
  let userRequest = module.userRequest

  return typeof userRequest === 'string'
    ? userRequest.includes('node_modules')
    : false
}

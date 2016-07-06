var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['react', 'es2015', 'stage-2', 'react-hmre'] }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader?autoprefixer', 'postcss-loader', 'sass-loader'])
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        loader:'file?name=images/[name].[ext]'
      }
    ]
  },
  postcss: function(webpack) {
    return [
      // Need this setting in order to enable hot-reloading when the other css files change
      // See: https://github.com/postcss/postcss-import#adddependencyto
      require('postcss-import')({addDependencyTo: webpack}),
      require('postcss-url')(),
      require("postcss-cssnext")({browsers: 'last 2 versions'}),
      require("postcss-pxtorem")(),
      require("postcss-mixins")(),
      require("postcss-extend")(),
      require('css-mqpacker')(),
      require("postcss-browser-reporter")(),
      require("postcss-reporter")()
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  },
  plugins: [
    new ExtractTextPlugin("main.css"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      "React": "react"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js']
  }
};

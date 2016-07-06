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
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader'])
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
  postcss: [
    // Need this setting in order to enable hot-reloading when the other css files change
    // See: https://github.com/mxstbr/react-boilerplate/blob/master/makewebpackconfig.js#L94-L99
    require('postcss-import')({
      glob: true,
      onImport: function (files) {
          files.forEach(this.addDependency);
      }.bind(this)
    }),
    require("postcss-url")(),
    require("postcss-cssnext")(),
    require("cssnano")(),
    require('postcss-simple-vars')(),
    require("postcss-pxtorem")(),
    require("postcss-mixins")(),
    require("postcss-extend")(),
    require("postcss-browser-reporter")(),
    require("postcss-reporter")(),
    require("autoprefixer")({browsers: ['last 2 versions', 'ie >= 9']}),
    require('css-mqpacker')()
  ],
  eslint: {
    configFile: './.eslintrc'
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
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

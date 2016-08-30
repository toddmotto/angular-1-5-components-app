/**
*
* Mike Erickson <codedungeon@gmail.com>
* 2016.08.27 12:17 (mikeerickson)
* =============================================================================
*/


import chalk               from 'chalk'
import CleanWebpackPlugin  from 'clean-webpack-plugin'
import CopyWebpackPlugin   from 'copy-webpack-plugin'
import path                from 'path'
import ProgressBarPlugin   from 'progress-bar-webpack-plugin'
import SemverPlugin        from 'semver-webpack-plugin'
import webpack             from 'webpack'

let outputPath     = path.join(__dirname, '/dist')
let outputFilename = 'js/bundle.js'
let publicPath     = path.join(__dirname, '/dist')

let webpackConfig = {
  context: __dirname + '/src',
  devtool: 'eval', // source-map
  entry: {
    app: './app/root.module.js',
    vendors: ['angular', 'lodash']
  },
  output: {
    path:       outputPath,
    filename:   outputFilename,
    publicPath: publicPath
  },
  resolve: {
    extensions: ['', '.js']
  },
  devServer: {
    contentBase: outputPath,
    hot: true
  },
  module: {
    preLoaders: [],
    loaders: [
			{test: /\.sass$/, include: path.join(__dirname, 'src/sass'),	loader: 'style!css!sass?sourceMap'},
      {test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/},
      {test: /\.html?$/, loaders: ['raw']},
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  plugins: [

    // build vendors.js file
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendor.js', Infinity),

    new SemverPlugin({
      files: [path.resolve(__dirname, 'package.json')],
      incArgs: ['prerelease','build']
    }),

    // Removes duplicate modules from the build
    new webpack.optimize.DedupePlugin(),

    // Configure ProgressBar
    new ProgressBarPlugin({
      format: chalk.yellow.bold('  Building Development [:bar] ') + chalk.green.bold(':percent') + chalk.bold(' (:elapsed seconds)'),
      clear: false,
      summary: true
    }),

    // Copy assets not part of bundle
    new CopyWebpackPlugin([
      {from: './index.html', to: './index.html'},
      {from: './img', to: './img'},
      {from: './img', to: './img'},
      {from: './fonts', to: './fonts'}
    ]),

    new CleanWebpackPlugin(['dist'])

  ]
};

export default webpackConfig;

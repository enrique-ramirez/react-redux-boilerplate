const path = require('path')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const port = 8080

const plugins = [
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/,
    failOnError: false,
  }),
]

module.exports = require('./webpack.common')({
  mode: 'development',
  devtool: 'source-map',

  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    path.join(process.cwd(), 'src/app.js'),
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  plugins,

  performance: {
    hints: false,
  },

  optimization: {
    noEmitOnErrors: true,
  },

  devServer: {
    contentBase: path.join(process.cwd(), 'dist'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    port,
  },
})

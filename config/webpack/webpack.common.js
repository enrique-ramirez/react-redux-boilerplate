const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = options => ({
  mode: options.mode,
  devtool: options.devtool,
  entry: options.entry,
  output: Object.assign({
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
  }, options.output),
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '/images/[name].[hash].[ext]',
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      hash: true,
    }),
  ]),
  resolve: {
    modules: [path.resolve(__dirname, '../..', 'src'), 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  optimization: Object.assign({
    splitChunks: {
      name: 'vendor',
      minChunks: 1,
    },
  }, options.optimization),
  target: 'web',
  performance: options.performance || {},
  devServer: options.devServer,
})

const path = require('path')

const nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .map(p => path.resolve('./', p))

module.exports = {
  resolve: {
    modules: ['src', 'node_modules'].concat(nodePaths),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: './images/[name].[hash].[ext]',
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          },
        }],
      },
    ],
  },
}

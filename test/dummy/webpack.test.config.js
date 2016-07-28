import path from 'path'
import SvgSprite from '../../src'
import CompressionPlugin from 'compression-webpack-plugin'

module.exports = {
  entry: path.join(__dirname, 'entry.js'),

  module: {
    loaders: [
      {
        test: /\.svg$/,
        loaders: [
          'file'
        ]
      }
    ]
  },

  plugins: [
    new CompressionPlugin(),
    new SvgSprite()
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};

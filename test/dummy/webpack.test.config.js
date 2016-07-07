import path from 'path'
import SvgSprite from '../../src'

module.exports = {
  entry: path.join(__dirname, 'entry.js'),

  module: {
    loaders: [
      { test: /\.svg$/, loader: 'file-loader?emitFile=false' }
    ]
  },

  plugins: [
    new SvgSprite()
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};

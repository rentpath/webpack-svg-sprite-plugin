import sinon from 'sinon'
import { expect } from 'chai'
import webpackSvgSpritePlugin from '../src'
import webpack from 'webpack'
import config from './dummy/webpack.test.config'
import fs from 'fs'
import path from 'path'

describe('webpackSvgSpritePlugin', function () {
  var outputFile = path.join(__dirname, '/dummy/dist/svg-sprite.svg')

  beforeEach(function(done) {
    webpack(config, function(err, stats) {
      if(err) throw err;
      if(stats.hasErrors()) throw 'build has errors';
      if(stats.hasWarnings()) throw 'build has warnings';

      done();
    });
  })

  afterEach(function() {
    if(fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile)
    }
  })

  it('generates a sprite from multiple svg files', function () {
    var expected = fs.readFileSync(path.join(__dirname, 'expected.svg'), 'utf-8')
    var dummyOutput = fs.readFileSync(outputFile, 'utf-8')

    expect(dummyOutput).to.eql(expected)
  })
})

import { expect } from 'chai'
import webpack from 'webpack'
import config from './dummy/webpack.test.config'
import fs from 'fs'
import path from 'path'

describe('webpackSvgSpritePlugin', function() {
  const outputFile = path.join(__dirname, '/dummy/dist/test-4408f411.svg')

  beforeEach(function(done) {
    webpack(config, function(err, stats) {
      if (err) {
        throw err
      }
      if (stats.hasErrors()) {
        Error('build has errors')
      }
      if (stats.hasWarnings()) {
        Error('build has warnings')
      }
      done()
    })
  })

  afterEach(function() {
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile)
    }
  })

  it('generates a sprite from multiple svg files', function() {
    const expected = fs.readFileSync(path.join(__dirname, 'expected.svg'), 'utf-8')
    const dummyOutput = fs.readFileSync(outputFile, 'utf-8')

    expect(dummyOutput).to.eql(expected)
  })
})

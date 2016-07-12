import fs from 'fs'
import SVGSpriter from 'svg-sprite'

const DEFAULT_OPTIONS = {
  filename: 'svg-sprite.svg'
}

class SvgSpritePlugin {
  constructor(options) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
  }

  apply(compiler) {
    const { filename } = this.options

    compiler.plugin('emit', (compilation, done) => {
      const svgs = compilation.fileDependencies.filter(file => file.match(/\.svg$/))

      const spriter = new SVGSpriter({
        mode: { symbol: true },
        shape: { transform: [] },
        svg: { namespaceIDs: false }
      })

      svgs.forEach(svg => {
        spriter.add(svg, null, fs.readFileSync(svg, { encoding: 'utf-8' }))
      })

      spriter.compile((err, result) => {
        if (err) {
          throw err
        }

        const contents = result.symbol.sprite.contents.toString('utf-8')

        compilation.assets[filename] = {
          source: () => contents,
          size: () => contents.length
        }

        done()
      })
    })
  }
}

export default SvgSpritePlugin

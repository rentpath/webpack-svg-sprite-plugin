import SVGSpriter from 'svg-sprite'

const DEFAULT_OPTIONS = {
  filename: 'svg-sprite.svg',
}

class SvgSpritePlugin {
  constructor(options) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
  }

  apply(compiler) {
    const { filename } = this.options

    /* eslint-disable  no-param-reassign */
    compiler.plugin('this-compilation', compilation => {
      compilation.plugin('optimize-assets', (assets, done) => {
        const spriter = new SVGSpriter({
          mode: { symbol: true },
          shape: { transform: [] },
          svg: { namespaceIDs: false },
        })

        compilation.modules.forEach(module => {
          if (module.resource && module.resource.match(/\.svg$/)) {
            const hashName = Object.keys(module.assets)[0]
            const contents = module.assets[hashName].source()
            spriter.add(module.resource, null, contents)

            delete assets[hashName]
          }
        })

        spriter.compile((err, result) => {
          if (err) {
            throw err
          }

          const contents = result.symbol.sprite.contents.toString('utf-8')

          assets[filename] = {
            source: () => contents,
            size: () => contents.length,
          }
        })

        done()
      })
    })
    /* eslint-enable  no-param-reassign */
  }
}

export default SvgSpritePlugin

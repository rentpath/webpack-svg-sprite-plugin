import SVGSpriter from 'svg-sprite'

const DEFAULT_OPTIONS = {
  filename: 'sprite-svg.svg',
}

const hashPlaceholder = '[hash]'

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
          mode: {
            symbol: {
              bust: filename.indexOf(hashPlaceholder) > -1,
              sprite: 'sprite',
            },
          },
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
          const resultSprite = result.symbol.sprite
          const contents = resultSprite.contents.toString('utf-8')
          const hash = resultSprite.stem.split('-')[1]

          assets[filename.replace(hashPlaceholder, hash)] = {
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

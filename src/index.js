var fs = require('fs')
var SVGSpriter = require('svg-sprite');

function SvgSprite(options) {
  var defaultOptions = {
    filename: 'svg-sprite.svg'
  }

  this.options = Object.assign({}, defaultOptions, options);
}

SvgSprite.prototype.apply = function(compiler) {
  var config = this.options;

  compiler.plugin('emit', function(compilation, callback) {
    var svgs = compilation.fileDependencies.filter(function(file) {
      return file.match(/svg$/);
    });

    var spriter = new SVGSpriter({
      mode: { symbol: true },
      shape: { transform: [] }
    });

    svgs.forEach(function(svg) {
      spriter.add(svg, null, fs.readFileSync(svg, { encoding: 'utf-8' }));
    });

    spriter.compile(function(err, result) {
      if(err) {
        throw err;
      }

      var contents = result.symbol.sprite.contents.toString('utf-8');

      compilation.assets[config.filename] = {
        source: function() {
          return contents;
        },
        size: function() {
          return contents.length;
        }
      };
    })

    callback();
  });
}

export default SvgSprite

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _svgSprite = require('svg-sprite');

var _svgSprite2 = _interopRequireDefault(_svgSprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_OPTIONS = {
  filename: 'svg-sprite.svg'
};

var SvgSpritePlugin = function () {
  function SvgSpritePlugin(options) {
    _classCallCheck(this, SvgSpritePlugin);

    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
  }

  _createClass(SvgSpritePlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var filename = this.options.filename;


      compiler.plugin('emit', function (compilation, done) {
        var svgs = compilation.fileDependencies.filter(function (file) {
          return file.match(/\.svg$/);
        });

        var spriter = new _svgSprite2.default({
          mode: { symbol: true },
          shape: { transform: [] },
          svg: { namespaceIDs: false }
        });

        svgs.forEach(function (svg) {
          spriter.add(svg, null, _fs2.default.readFileSync(svg, { encoding: 'utf-8' }));
        });

        spriter.compile(function (err, result) {
          if (err) {
            throw err;
          }

          var contents = result.symbol.sprite.contents.toString('utf-8');

          compilation.assets[filename] = {
            source: function source() {
              return contents;
            },
            size: function size() {
              return contents.length;
            }
          };

          done();
        });
      });
    }
  }]);

  return SvgSpritePlugin;
}();

exports.default = SvgSpritePlugin;
module.exports = exports['default'];
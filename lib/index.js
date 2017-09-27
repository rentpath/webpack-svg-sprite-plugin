'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _svgSprite = require('svg-sprite');

var _svgSprite2 = _interopRequireDefault(_svgSprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_OPTIONS = {
  filename: 'sprite-svg.svg'
};

var hashPlaceholder = '[hash]';

var SvgSpritePlugin = function () {
  function SvgSpritePlugin(options) {
    _classCallCheck(this, SvgSpritePlugin);

    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
  }

  _createClass(SvgSpritePlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var filename = this.options.filename;

      /* eslint-disable  no-param-reassign */

      compiler.plugin('this-compilation', function (compilation) {
        compilation.plugin('optimize-assets', function (assets, done) {
          var spriter = new _svgSprite2.default({
            mode: {
              symbol: {
                bust: filename.indexOf(hashPlaceholder) > -1,
                sprite: 'outputsprite'
              }
            },
            shape: { transform: [] },
            svg: { namespaceIDs: false }
          });

          compilation.modules.forEach(function (module) {
            if (module.resource && module.resource.match(/\.svg$/)) {
              var hashName = Object.keys(module.assets)[0];
              var contents = module.assets[hashName].source();
              spriter.add(module.resource, null, contents);

              delete assets[hashName];
            }
          });

          spriter.compile(function (err, result) {
            if (err) {
              throw err;
            }
            var resultSprite = result.symbol.sprite;
            var contents = resultSprite.contents.toString('utf-8');
            var hash = resultSprite.stem.split('-')[1];

            assets[filename.replace(hashPlaceholder, hash)] = {
              source: function source() {
                return contents;
              },
              size: function size() {
                return contents.length;
              }
            };
          });

          done();
        });
      });
      /* eslint-enable  no-param-reassign */
    }
  }]);

  return SvgSpritePlugin;
}();

exports.default = SvgSpritePlugin;
module.exports = exports['default'];
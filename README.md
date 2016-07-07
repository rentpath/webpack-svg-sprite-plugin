# webpack-svg-sprite-plugin
Webpack plugin that finds all SVG assets in the build and generates a svg sprite with `<symbol>` elements.



## Installation
```bash
$ npm i --save webpack-svg-sprite-plugin
```

## Usage
```javascript
  var SvgSpritePlugin = require('webpack-svg-sprite-plugin')

  module.exports = {
    // ...
    plugins: [
      new SvgSpritePlugin({ filename: 'my-sprite.svg' })
    ]
  }
```

### Configuration
```javascript
{
  filename: 'sprite-name.svg' // Filename the sprite will be added with. Default: 'svg-sprite.svg'
}
```


## Scripts
* `npm run compile` - Compiles the module to disk (~/lib).
* `npm run compile:watch` - Same as `npm run compile` but watches files for changes.
* `npm run lint` - Lints all files.
* `npm run lint:fix` - Lints all files and attempts to fix any issues.
* `npm run test` - Runs unit tests.
* `npm run test:watch` - Same as `npm test` but watches files for changes.
* `npm run test:cov` - Generates a test coverage report.

## Distribution
Execute one of the following commands
```bash
npm version patch -m "Bumped to %s"
npm version minor -m "Bumped to %s"
npm version major -m "Bumped to %s"
```

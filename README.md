# webpack-svg-sprite-plugin
 [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
 [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=plastic)](https://github.com/semantic-release/semantic-release)
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


## Commitizen
  `eslint-config-rentpath` uses [Commitizen](https://commitizen.github.io/cz-cli/) to format commit messages.
  * Install it globally `$ npm install -g commitizen`
 Once you are ready to commit, follow the familiar github workflow, with a slight change.

 ```
 $ git add <files>
 $ git cz
 ```

 `$ git cz` will bring up the Commitizen commit prompt, follow the instructions, and `$ git push` as usual.


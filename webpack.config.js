const path = require('path')
const fs = require('fs')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')

// Set WordPress build environment vars
// Tell WordPress to copy .php files
process.env.WP_COPY_PHP_FILES_TO_DIST = 'true' // This just needs to be set
// Tell wordpress where to find block files
process.env.WP_SRC_DIRECTORY = 'resources/blocks'

// Import WordPress webpack config
let defaultConfig = require('@wordpress/scripts/config/webpack.config')
defaultConfig.resolve.alias['wp-blockeditor-utilities'] = path.resolve(__dirname, 'modules/wp-blockeditor-utilities')
defaultConfig.resolve.alias['img'] = path.resolve(__dirname, 'public/img')
// Overwrite output directory for WordPress so that blocks are build to public/build/blocks
const wpConfig = {
  ...defaultConfig,
}

// entries will hold the files we need to build
let entries = {}

// Find all scripts located top level in resources/js/ and add them as build entries
fs.readdirSync('./resources/js').forEach(file => {
  if (path.extname(file) === '.js' || path.extname(file) === '.jsx') {
    let f = path.parse(file)
    entries['../js/' + f.name] = ['./resources/js/' + file]
  }
})

// Find all SASS stylesheets located top level in resources/css/ and add them as build entries
fs.readdirSync('./resources/css').forEach(file => {
  if (path.extname(file) === '.scss') {
    let f = path.parse(file)
    entries['../css/' + f.name] = ['./resources/css/' + file]
  }
})

// the webpack config for our assets
const config = {
  ...defaultConfig,
  entry: entries,
  resolve: {
    alias: {
      'fonts': path.join(__dirname, 'public/fonts'),
      'img': path.join(__dirname, 'public/img')
    }
  },
  plugins: [
    ...defaultConfig.plugins,
    new RemoveEmptyScriptsPlugin() // This removes empty generated script files for .scss files https://github.com/webdiscus/webpack-remove-empty-scripts
  ]
}

module.exports = [
  config,
  wpConfig,
]

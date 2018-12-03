const fs = require('fs')
const path = require('path')

module.exports = function includeDirectoryJsFiles(dirname, filename) {
  const basename = path.basename(filename)
  return fs
    .readdirSync(dirname)
    .filter((file) => {
      return (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
      )
    })
    .map((file) => require(path.join(dirname, file)))
}

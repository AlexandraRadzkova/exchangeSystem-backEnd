const fs = require('fs')
const path = require('path')

const isJsFile = (file) => path.extname(file) === '.js'

module.exports = function includeDirectoryJsFiles(
  dirname,
  filename = null,
  requireFunc = require,
) {
  const basename = filename && path.basename(filename)
  return fs
    .readdirSync(dirname)
    .filter((file) => file !== basename && isJsFile(file))
    .map((file) => requireFunc(path.join(dirname, file)))
}

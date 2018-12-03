const Router = require('koa-router')
const router = new Router()

const includeDirectoryJsFiles = require('../utils/includeDirectoryJsFiles')
const controllers = includeDirectoryJsFiles(__dirname, __filename)

controllers.forEach(({ path, router: controllerRouter }) => {
  router.use(path, controllerRouter.routes(), controllerRouter.allowedMethods())
})

module.exports = router

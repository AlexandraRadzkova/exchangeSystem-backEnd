module.exports = async function bodyResolver(ctx, next) {
  const result = await next()
  const body = ctx.body || result
  if (body) {
    ctx.body = body
  }
}

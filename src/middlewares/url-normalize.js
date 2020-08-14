const { normalize } = require('path')
// eslint-disable-next-line node/no-deprecated-api
const { parse, format } = require('url')

module.exports = function urlNormalizeMiddleware () {
  return (req, res, next) => {
    // 解决windows、Linux系统使用normalize路径分隔符不一致的问题
    const pathname = normalize(req.path).split('\\').join('/')
    const urlParsed = parse(req.url)

    let shouldRedirect = false

    if (req.path !== pathname) {
      urlParsed.pathname = pathname
      shouldRedirect = true
    }

    if (shouldRedirect) {
      res.redirect(format(urlParsed))
    } else {
      next()
    }
  }
}

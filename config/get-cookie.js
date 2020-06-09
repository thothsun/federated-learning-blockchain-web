const cookieparser = require('cookieparser')
const getCookie = function (req) {
  if (req && req.headers && req.headers.cookie) {
    const parsed = cookieparser.parse(req.headers.cookie)
    return parsed
  } else {
    return {auth: null, lang: null}
  }
}
export default getCookie

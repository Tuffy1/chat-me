const jwt = require('jwt-simple')
const Auth = require('../models/auth')
const parseCookie = require('./parseCookie')
const secret = 'Joyee'

module.exports = (req, res, cb) => {
  if (parseCookie(req.headers.cookie).token) {
    const token = parseCookie(req.headers.cookie).token
    const payload = jwt.decode(token, secret)
    Auth.findOne({user: payload.userId}, (err, doc) => {
      if (err) {
        console.log(err)
      } else if (!doc) {
        res.send({code: 403, msg: '请先登录'})
      } else {
        const payload = jwt.decode(token, secret)
        cb(payload)
      }
    })
  } else {
    res.send({code: 403, msg: '请先登录'})
  }
}

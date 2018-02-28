const jwt = require('jwt-simple')
const Auth = require('../models/auth')
const secret = 'Joyee'

module.exports = (user, token, end, cb) => {
  const payload = jwt.decode(token, secret)
  Auth.findOne({user: payload.userId}, (err, doc) => {
    if (!!err) {
      console.log(err)
    } else if (!doc) {
      res.send({code: 403, msg: '请先登录'})
    } else {
      cb()
    }
  })
}

const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const User = require('../models/user')
const Auth = require('../models/auth')
// const Message = require('../models/user-message')

const serializeCookie = require('../util/serializeCookie')
const isLogin = require('../util/isLogin')

const parseCookie = require('../util/parseCookie')
const secret = 'Joyee'

router.post('/auth', (req, res) => {
  // User.findOne({username: req.body.username}, (err, doc) => {
  //   switch (true) {
  //     case !!err:
  //       console.log(err)
  //       break
  //     case !doc:
  //       res.send({code: 0, msg: '账号不存在'})
  //       break
  //     case doc.password !== req.body.password:
  //       res.send({code: 422, msg: '密码错误'})
  //       break
  //     case doc.password === req.body.password:
  //       const uuid = doc._id
  //       const token = jwt.encode({userId: uuid, expires: Date.now() + (1000 * 60 * 60 * 24 * 7)}, secret)
  //       const socketId = parseCookie(req.headers.cookie).io
  //       Auth.findOne({user: uuid}, (err, doc) => {
  //         if (err) {
  //           console.log(err)
  //         }
  //         if (!doc) {
  //           const auth = new Auth({
  //             user: uuid,
  //             clients: [socketId]
  //           })
  //           auth.save((err) => console.log(err))
  //         } else {
  //           Auth.update({'user': uuid}, {'$push': {'clients': socketId}}, err => console.log(err))
  //         }
  //       })
  //       res.setHeader('Set-Cookie', serializeCookie('token', token))
  //       res.send({code: 200, msg: '登陆成功', token: token})
  //       break
  //     default:
  //       res.send({code: 3, msg: '未知错误'})
  //   }
  // })
  const token = jwt.encode({userId: req.body.username, expires: Date.now() + (1000 * 60 * 60 * 24 * 7)}, secret)
  res.setHeader('Set-Cookie', serializeCookie('token', token))
  res.send({code: 200, msg: '登陆成功'})
  db.User.insert({username, password})
})

module.exports = router

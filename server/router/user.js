const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const secret = 'Joyee'
const User = require('../models/user')

const serializeCookie = require('../util/serializeCookie')
const parseCookie = require('../util/parseCookie')

router.post('/api/user/register', (req, res) => {
  const theUser = new User({
    username: req.body.username,
    password: req.body.password
  })
  theUser.save((err) => console.log(err))
})

router.post('/api/user/login', (req, res) => {
  // User.findOne({username: req.body.username}, (err, doc) => {
    // switch (true) {
    //   case !!err:
    //     console.log(err)
    //     break
    //   case !doc:
    //     res.send({code: 0, msg: '账号不存在'})
    //     break
    //   case doc.password !== req.body.password:
    //     res.send({code: 422, msg: '密码错误'})
    //     break
    //   case doc.password === req.body.password:
    //     const token = jwt.encode({userId: doc._id, expires: Date.now() + (1000 * 60 * 60 * 24 * 7)}, secret)
    //     res.send({code: 200, msg: '登陆成功', token: token})
    //     break
    //   default:
    //     res.send({code: 3, msg: '未知错误'})
    // } 
  // })
  const token = jwt.encode({userId: req.body.username, expires: Date.now() + (1000 * 60 * 60 * 24 * 7)}, secret)
  // auth.save((err) => console.log(err))
  res.setHeader('Set-Cookie', serializeCookie('token', token))
  res.send({code: 200, msg: '登陆成功'})
  // db.User.insert({username, password})
})

router.post('/api/user/userSearch', (req, res) => {
  const query = {
    username: req.body.query
  }
  User.find(query, (err, doc) => {
    if (err) {
      console.log(err)
      res.send({code: 700, msg: '查询出错：' + err})
    } else {
      res.send({code: 200, msg: 'success', result: doc})
    }
  })
})

router.post('/api/user/addChatNow', (req, res) => {
  const query = {
    username: req.body.query
  }
  // User.find(query, (err, doc) => {
  //   if (err) {
  //     console.log(err)
  //     res.send({code: 700, msg: '查询出错：' + err})
  //   } else {
  //     res.send({code: 200, msg: 'success', result: doc})
  //   }
  // })                         
  if (req.headers.cookie) {
    const token = parseCookie(req.headers.cookie).token
    // let user = {}
    // isLogin(user, token, res.end, cb)
    const payload = jwt.decode(token, secret)
    res.send({code: 404, msg: 'success'})
  } else {
    res.send({code: 403, msg: '请先登录'})
  }
})

module.exports = router

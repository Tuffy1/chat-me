const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const secret = 'Joyee'
const User = require('../models/user')
const Auth = require('../models/auth')

const serializeCookie = require('../util/serializeCookie')
const parseCookie = require('../util/parseCookie')
const isLogin = require('../util/isLogin')

router.post('/api/user/register', (req, res) => {
  const theUser = new User({
    nickname: req.body.nickname,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    introduce: ''
  })
  theUser.save((err) => {
    if (err) {
      console.log(err)
    } else {
      res.send({code: 200, msg: '注册成功'})
    }
  })
})

router.post('/api/user/login', (req, res) => {
  User.findOne({username: req.body.username}, (err, doc) => {
    switch (true) {
      case !!err:
        console.log(err)
        break
      case !doc:
        res.send({code: 0, msg: '账号不存在'})
        break
      case doc.password !== req.body.password:
        res.send({code: 422, msg: '密码错误'})
        break
      case doc.password === req.body.password:
        const uuid = doc._id
        const token = jwt.encode({userId: uuid, expires: Date.now() + (1000 * 60 * 60 * 24 * 7)}, secret)
        const auth = new Auth({
          user: uuid
        })
        console.log(uuid)
        Auth.find({user: uuid}, (err, doc) => {
          if (err) {
            console.log(err)
          }
          if (!doc) {
            console.log('save')
            auth.save((err) => console.log(err))
          } else {
            console.log(doc)
          }
        })
        res.setHeader('Set-Cookie', serializeCookie('token', token))
        res.send({code: 200, msg: '登陆成功', token: token})
        break
      default:
        res.send({code: 3, msg: '未知错误'})
    }
  })
  // const token = jwt.encode({userId: req.body.username, expires: Date.now() + (1000 * 60 * 60 * 24 * 7)}, secret)
  // res.setHeader('Set-Cookie', serializeCookie('token', token))
  // res.send({code: 200, msg: '登陆成功'})
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

router.get('/api/user/getChatNow', (req, res) => {
  if (parseCookie(req.headers.cookie).token) {
    const token = parseCookie(req.headers.cookie).token
    isLogin(token, res, () => {
      const payload = jwt.decode(token, secret)
      User.findById({'_id': payload.userId}, (err, doc) => {
        if (err) {
          console.log(err)
          res.send({code: 700, msg: '查询出错：' + err})
        } else {
          res.send({code: 200, msg: 'success', result: doc.chatNow})
        }
      })
    })
  } else {
    res.send({code: 403, msg: '请先登录'})
  }
})

router.post('/api/user/addChatNow', (req, res) => {
  if (parseCookie(req.headers.cookie).token) {
    const token = parseCookie(req.headers.cookie).token
    isLogin(token, res, () => {
      const payload = jwt.decode(token, secret)
      User.update({'_id': payload.userId}, {'$addToSet': {'chatNow': req.body.user}}, (err, doc) => {
        if (err) {
          console.log(err)
          res.send({code: 700, msg: '查询出错：' + err})
        } else {
          res.send({code: 200, msg: 'success'})
        }
      })
      // res.send({code: 404, msg: '无此数据'})
    })
  } else {
    res.send({code: 403, msg: '请先登录'})
  }
})

router.get('/api/user/getFriends', (req, res) => {
  if (parseCookie(req.headers.cookie).token) {
    const token = parseCookie(req.headers.cookie).token
    isLogin(token, res, () => {
      const payload = jwt.decode(token, secret)
      User.findById({'_id': payload.userId}, (err, doc) => {
        if (err) {
          console.log(err)
          res.send({code: 700, msg: '查询出错：' + err})
        } else {
          res.send({code: 200, msg: 'success', result: doc.friends})
        }
      })
    })
  } else {
    res.send({code: 403, msg: '请先登录'})
  }
})

router.post('/api/user/newFriend', (req, res) => {
  if (parseCookie(req.headers.cookie).token) {
    const token = parseCookie(req.headers.cookie).token
    isLogin(token, res, () => {
      const payload = jwt.decode(token, secret)
      User.update({'_id': payload.userId}, {'$addToSet': {'friends': req.body.user}}, (err, doc) => {
        if (err) {
          console.log(err)
          res.send({code: 700, msg: '查询出错：' + err})
        } else {
          res.send({code: 200, msg: 'success', result: doc.friends})
        }
      })
    })
  } else {
    res.send({code: 403, msg: '请先登录'})
  }
})

module.exports = router

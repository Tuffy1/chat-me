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

router.post('/register', (req, res) => {
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

// router.post('/login', (req, res) => {
//   User.findOne({username: req.body.username}, (err, doc) => {
//     switch (true) {
//       case !!err:
//         console.log(err)
//         break
//       case !doc:
//         res.send({code: 0, msg: '账号不存在'})
//         break
//       case doc.password !== req.body.password:
//         res.send({code: 422, msg: '密码错误'})
//         break
//       case doc.password === req.body.password:
//         const uuid = doc._id
//         const token = jwt.encode({userId: uuid, expires: Date.now() + (1000 * 60 * 60 * 24 * 7)}, secret)
//         const socketId = parseCookie(req.headers.cookie).io
//         Auth.findOne({user: uuid}, (err, doc) => {
//           if (err) {
//             console.log(err)
//           }
//           if (!doc) {
//             const auth = new Auth({
//               user: uuid,
//               clients: [socketId]
//             })
//             auth.save((err) => console.log(err))
//           } else {
//             Auth.update({'user': uuid}, {'$push': {'clients': socketId}}, err => console.log(err))
//           }
//         })
//         res.setHeader('Set-Cookie', serializeCookie('token', token))
//         res.send({code: 200, msg: '登陆成功', token: token})
//         break
//       default:
//         res.send({code: 3, msg: '未知错误'})
//     }
//   })
  // const token = jwt.encode({userId: req.body.username, expires: Date.now() + (1000 * 60 * 60 * 24 * 7)}, secret)
  // res.setHeader('Set-Cookie', serializeCookie('token', token))
  // res.send({code: 200, msg: '登陆成功'})
  // db.User.insert({username, password})
// })

router.get('/info', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findById({'_id': payload.userId}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err})
      } else {
        res.send({code: 200, msg: 'success', result: doc})
      }
    })
  })
})

router.post('/userSearch', (req, res) => {
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

router.get('/getChatNow', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findById({'_id': payload.userId}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err})
      } else {
        res.send({code: 200, msg: 'success', result: doc.chatNow})
      }
    })
  })
})

router.post('/addChatNow', (req, res) => {
  isLogin(req, res, (payload) => {
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
})

router.get('/getFriends', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findById({'_id': payload.userId}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err})
      } else {
        res.send({code: 200, msg: 'success', result: doc.friends})
      }
    })
  })
})

router.post('/newFriend', (req, res) => {
  isLogin(req, res, (payload) => {
    User.update({'_id': payload.userId}, {'$addToSet': {'friends': req.body.user}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err})
      } else {
        res.send({code: 200, msg: 'success', result: doc.friends})
      }
    })
  })
})

router.post('/setUserInfo', (req, res) => {
  // isLogin(req, res, (payload) => {
  //   User.update({'_id': payload.userId}, {'$set': {'nickname': req.body.nickname, 'email': req.body.email, 'introduce': req.body.introduce}}, (err, doc) => {
  //     if (err) {
  //       console.log(err)
  //       res.send({code: 700, msg: '查询出错：' + err})
  //     } else {
  //       res.send({code: 200, msg: 'success'})
  //     }
  //   })
  // })
  res.send({code: 200, msg: 'success'})
})

module.exports = router

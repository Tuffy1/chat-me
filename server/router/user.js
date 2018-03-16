const express = require('express')
const router = express.Router()
// const jwt = require('jwt-simple')
const User = require('../models/user')
const Group = require('../models/group')
// const Auth = require('../models/auth')
// const Message = require('../models/user-message')

// const serializeCookie = require('../util/serializeCookie')
const isLogin = require('../util/isLogin')

// const parseCookie = require('../util/parseCookie')
// const secret = 'Joyee'

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
      res.send({code: 200, msg: err, success: false})
    } else {
      res.send({code: 200, result: '注册成功', success: true})
    }
  })
})

router.get('/info', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findById({'_id': payload.userId}, (err, doc) => {
      if (err) {
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc, success: true})
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
      res.send({code: 700, msg: '查询出错：' + err, success: false})
    } else {
      res.send({code: 200, result: doc, success: true})
    }
  })
})

router.get('/getChatNow', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findById({'_id': payload.userId}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc.chatNow, success: true})
      }
    })
  })
})

router.post('/addChatNow', (req, res) => {
  isLogin(req, res, (payload) => {
    User.update({'_id': payload.userId}, {'$addToSet': {'chatNow': req.body.user}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc, success: true})
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
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc.friends, success: true})
      }
    })
  })
})

router.post('/newFriend', (req, res) => {
  isLogin(req, res, (payload) => {
    User.update({'_id': payload.userId}, {'$addToSet': {'friends': req.body.user}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc.friends, success: true})
      }
    })
  })
})

router.get('/getGroups', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findById({'_id': payload.userId}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc.groups, success: true})
      }
    })
  })
})

router.post('/newGroup', (req, res) => {
  isLogin(req, res, (payload) => {
    const theGroup = new Group({
      nickname: req.body.group.nickname,
      username: req.body.group.username,
      introduce: req.body.group.introduce,
      members: req.body.group.members
    })
    theGroup.save((err, doc) => {
      const newGroup = doc
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '保存出错：' + err, success: false})
      } else {
        User.update({'_id': payload.userId}, {'$addToSet': {'groups': theGroup}}, (err, doc) => {
          if (err) {
            console.log(err)
            res.send({code: 700, msg: '查询出错：' + err, success: false})
          } else {
            res.send({code: 200, result: newGroup, success: true})
          }
        })
      }
    })
  })
})

router.post('/setUserInfo', (req, res) => {
  isLogin(req, res, (payload) => {
    User.update({'_id': payload.userId}, {'$set': {'nickname': req.body.nickname, 'email': req.body.email, 'introduce': req.body.introduce}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc, success: true})
      }
    })
  })
})

router.post('/setUserPassword', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findById({_id: payload.userId}, (err, doc) => {
      switch (true) {
        case !!err:
          console.log(err)
          break
        case !doc:
          res.send({code: 0, msg: '查询失败', success: false})
          break
        case doc.password !== req.body.oldPassword:
          res.send({code: 422, msg: '原密码输入错误', success: false})
          break
        case doc.password === req.body.oldPassword:
          User.update({_id: payload.userId}, {'$set': {'password': req.body.newPassword}}, (err, doc) => {
            if (err) {
              res.send({code: 700, msg: '更改出错：' + err, success: false})
            } else {
              res.send({code: 200, result: doc, success: true})
            }
          })
          break
        default:
          res.send({code: 3, msg: '未知错误', success: false})
      }
    })
  })
})

module.exports = router

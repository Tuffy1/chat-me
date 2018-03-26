const express = require('express')
const router = express.Router()
// const jwt = require('jwt-simple')
const mongoose = require('mongoose')
const User = require('../models/user')
const Group = require('../models/group')
// const Auth = require('../models/auth')
// const Message = require('../models/user-message')

// const serializeCookie = require('../util/serializeCookie')
const isLogin = require('../util/isLogin')

// const parseCookie = require('../util/parseCookie')
// const secret = 'Joyee'
const bcrypt = require('bcrypt')
const saltRounds = 10

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err)
    } else {
      const theUser = new User({
        nickname: req.body.nickname,
        username: req.body.username,
        password: hash,
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
    const user = {
      _id: doc._id,
      nickname: doc.nickname,
      username: doc.username,
      avatar: doc.avatar,
      introduce: doc.introduce,
      creatAt: doc.creatAt
    }   
    if (err) {
      res.send({code: 700, msg: '查询出错：' + err, success: false})
    } else {
      res.send({code: 200, result: user, success: true})
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

router.post('/removeChat', (req, res) => {
  isLogin(req, res, (payload) => {
    User.update({'_id': payload.userId}, {'$pull': {'chatNow': {'username': req.body.user.username}}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        res.send({code: 200, result: doc, success: true})
      }
    })
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

router.post('/deleteFriend', (req, res) => {
  isLogin(req, res, (payload) => {
    User.update({'_id': payload.userId}, {'$pull': {'friends': {'_id': req.body.user._id}}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        User.update({'_id': payload.userId}, {'$pull': {'chatNow': {'_id': req.body.user._id}}}, (err, doc) => {
          if (err) {
            console.log(err)
            res.send({code: 700, msg: '查询出错：' + err, success: false})
          } else {
            res.send({code: 200, result: doc, success: true})
          }
        })
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
        req.body.group.members.forEach(member => {
          User.update({'_id': member}, {'$addToSet': {'groups': theGroup}}, (err, doc) => {
            if (err) {
              console.log(err)
              // res.send({code: 700, msg: '查询出错：' + err, success: false})
            }
          })
        })
        res.send({code: 200, result: newGroup, success: true})
      }
    })
  })
})

router.post('/deleteGroup', (req, res) => {
  isLogin(req, res, (payload) => {
    User.update({'_id': payload.userId}, {'$pull': {'groups': {'_id': mongoose.mongo.ObjectId(req.body.group._id)}}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        User.update({'_id': payload.userId}, {'$pull': {'chatNow': {'_id': req.body.group._id}}}, (err, doc) => {
          if (err) {
            console.log(err)
            res.send({code: 700, msg: '查询出错：' + err, success: false})
          } else {
            res.send({code: 200, result: doc, success: true})
          }
        })
      }
    })
  })
})

router.get('/showInfo', (req, res) => {
  isLogin(req, res, (payload) => {
    User.findOne({'username': req.query.username}, (err, doc) => {
      if (err) {
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        const result = {
          nickname: doc.nickname,
          username: doc.username,
          creatAt: doc.creatAt,
          introduce: doc.introduce
        }
        res.send({code: 200, result: result, success: true})
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

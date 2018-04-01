const express = require('express')
const router = express.Router()
// const jwt = require('jwt-simple')
const mongoose = require('mongoose')
const User = require('../models/user')
const Group = require('../models/group')
const Auth = require('../models/auth')
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
    console.log(doc)
    let user = {}
    let userList = []
    if (doc) {
      doc.forEach((USER) => {
        user = {
          _id: USER._id,
          nickname: USER.nickname,
          username: USER.username,
          avatar: USER.avatar,
          introduce: USER.introduce,
          creatAt: USER.creatAt
        }
        userList.push(user)
      })
    }
    if (err) {
      res.send({code: 700, msg: '查询出错：' + err, success: false})
    } else {
      res.send({code: 200, result: userList, success: true})
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
    User.update({'_id': req.body.user.to._id}, {'$addToSet': {'friends': req.body.user.from}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        Auth.findOne({user: req.body.user.to._id}, (err, doc) => {
          if (err) {
            res.send({code: 700, msg: '查询出错：' + err})
          } else if (doc) {
            const clients = doc.clients
            console.log('from')
            console.log(req.body.user.from)
            for (const client of clients) {
              global.io.to(client).emit('NEW_FRIEND', req.body.user.from)
            }
            res.send({code: 200, result: '等待对方验证', success: true})
          }
        })
      }
    })
  })
})

router.post('/friendConfirm', (req, res) => {
  isLogin(req, res, (payload) => {
    User.update({'_id': req.body.user.from._id, 'friends._id': req.body.user.to._id}, {'$set': {'friends.$.relat': true}}, (err, doc) => {
      if (err) {
        console.log(err)
      }
    })
    User.update({'_id': req.body.user.to._id}, {'$addToSet': {'friends': req.body.user.from}}, (err, doc) => {
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '查询出错：' + err, success: false})
      } else {
        Auth.findOne({user: req.body.user.to._id}, (err, doc) => {
          if (err) {
            res.send({code: 700, msg: '查询出错：' + err})
          } else if (doc) {
            const clients = doc.clients
            for (const client of clients) {
              global.io.to(client).emit('NEW_FRIEND', req.body.user.from)
            }
            res.send({code: 200, result: '成功添加', success: true})
          }
        })
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
    const theGroup = new Group(req.body.group)
    theGroup.save((err, doc) => {
      const newGroup = doc
      if (err) {
        console.log(err)
        res.send({code: 700, msg: '保存出错：' + err, success: false})
      } else {
        req.body.group.members.forEach(member => {
          User.update({'_id': member._id}, {'$addToSet': {'groups': theGroup}}, (err, doc) => {
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

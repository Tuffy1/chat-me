const express = require('express')
const router = express.Router()
// const jwt = require('jwt-simple')
// const User = require('../models/user')
const Auth = require('../models/auth')
const UserMessage = require('../models/message')

// const serializeCookie = require('../util/serializeCookie')
const isLogin = require('../util/isLogin')

// const parseCookie = require('../util/parseCookie')
// const socket = io.connect('http://localhost:8080')
// const secret = 'Joyee'

router.post('/sendMessage', (req, res) => {
  isLogin(req, res, (payload) => {
    const msg = new UserMessage({
      from: payload.userId,
      to: req.body.chatTo,
      content: req.body.content
    })
    msg.save((err) => {
      if (err) {
        res.send({code: 700, msg: '存入数据库出错：' + err, success: false})
      } else {
        // global.io.to(req.body.chatTo._id).emit('USER_MESSAGE', msg)
        // res.send({code: 200, result: msg, success: true})
        Auth.findOne({user: req.body.chatTo}, (err, doc) => {
          if (err) {
            res.send({code: 700, msg: '查询出错：' + err})
          } else if (doc) {
            const clients = doc.clients
            console.log(`clients: ${clients}`)
            for (const client of clients) {
              global.io.to(client).emit('USER_MESSAGE', msg)
            }
            res.send({code: 200, result: msg, msg: 'success'})
          } else if (!doc) {
            res.send({code: 3, msg: '找不到用户'})
          }
        })
      }
    })
  })
})

router.get('/getUserMessage', (req, res) => {
  isLogin(req, res, (payload) => {
    UserMessage.find({$or: [{from: payload.userId}, {to: payload.userId}]}, (err, doc) => {
      if (err) {
        res.send({code: 700, msg: '查询数据库出错：' + err, success: false})
      } else if (!doc) {
        res.send({code: 200, result: '暂无聊天记录', success: true})
      } else if (doc) {
        res.send({code: 200, result: doc, success: true})
      } else {
        res.send({code: 3, msg: '未知错误', success: false})
      }
    })
  })
})

module.exports = router

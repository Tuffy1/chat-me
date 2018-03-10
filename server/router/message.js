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
        res.send({code: 700, msg: '存入数据库出错：' + err})
      } else {
        Auth.findOne({user: payload.userId}, (err, doc) => {
          if (err) {
            res.send({code: 700, msg: '查询出错：' + err})
          } else {
            const clients = doc.clients
            for (const client of clients) {
              global.io.to(client).emit('chatMessage', 'joyee is here')
            }
            res.send({code: 200, msg: 'success'})
          }
        })
      }
    })
  })
})

module.exports = router

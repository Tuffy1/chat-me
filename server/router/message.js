const express = require('express')
const router = express.Router()
// const jwt = require('jwt-simple')
// const User = require('../models/user')
// const Auth = require('../models/auth')
const UserMessage = require('../models/message')

// const serializeCookie = require('../util/serializeCookie')
const isLogin = require('../util/isLogin')

// const parseCookie = require('../util/parseCookie')
// const secret = 'Joyee'

router.post('/sendMessage', (req, res) => {
  isLogin(req, res, (payload) => {
    const msg = new UserMessage({
      from: payload.userId,
      to: req.body.chatTo,
      content: req.body.content
    })
    msg.save(err => console.log(err))
  })
})

module.exports = router

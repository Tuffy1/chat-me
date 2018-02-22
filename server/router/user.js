const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/api/user/register', (req, res) => {
  const theUser = new User({
    username: req.body.username,
    password: req.body.password
  })
  theUser.save((err) => console.log(err))
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
      case doc.password === req.body.password:
        res.send({code: 200, msg: '登陆成功'})
        break
      case doc.password !== req.body.password:
        res.send({code: 422, msg: '密码错误'})
        break
      default:
        res.send({code: 3, msg: '未知错误'})
    }
  })
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

module.exports = router

const express = require('express')
const router = express.Router()
const db = require('./db')

router.post('/api/user/register', (req, res) => {
  const User = db.User
  const theUser = new User({
    username: req.body.username,
    password: req.body.password
  })
  theUser.save((err) => console.log(err))
})
router.post('/api/user/login', (req, res) => {
  db.User.findOne({username: req.body.username}, (err, doc) => {
    switch (true) {
      case !!err:
        console.log(err)
        break
      case !doc:
        res.send({state: 0, msg: '账号不存在'})
        break
      case doc.password === req.body.password:
        res.send({state: 200, msg: '登陆成功'})
        break
      case doc.password !== req.body.password:
        res.send({state: 422, msg: '密码错误'})
        break
      default :
        res.send({state: 3, msg: '未知错误'})
    }
  })
  // db.User.insert({username, password})
})

module.exports = router

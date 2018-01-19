const express = require('express')
const router = express.Router()
const db = require('./db')

router.post('/api/user/register', (req, res) => {
  const User = db.User
  const theUser = new User({
    username: req.body.username,
    password: req.body.password
  })
  theUser.save((err) => {
    console.log(err)
  })
  // db.User.insert({username, password})
  db.User.find({username: theUser.username}, (err, doc) => {
    if (err) {
      console.log(err)
    } else {
      console.log(doc)
      console.log(doc.password)
      console.log(theUser.password)
      if (doc.password === theUser.password) {
        console.log(doc)
        res.send({
          state: 200,
          msg: 'success'
        })
      }
    }
  })
})

module.exports = router

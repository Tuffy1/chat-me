const express = require('express')
const router = express.Router()

router.get('/api/user/login', (req, res) => {
  res.send({
    state: 200,
    msg: 'success'
  })
})

module.exports = router

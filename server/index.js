const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const authRouter = require('./router/auth')
const userRouter = require('./router/user')
const messageRouter = require('./router/message')
const mongoose = require('mongoose')
const Auth = require('./models/auth')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

// app.use('/public')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))
app.use('/api', authRouter)
app.use('/api/user', userRouter)
app.use('/api/message', messageRouter)
// express.static('/public')

app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
  res.send(html)
  // express.static(path.resolve(__dirname, '/public'))
})

http.listen(8088, () => {
  console.log('listening on 8088...')
})

io.on('connection', socket => {
  global.socket = socket
  socket.on('chat message', (msg) => {
    console.log(msg)
  })
  socket.on('joinroom', (groupId) => {
    socket.join(groupId)
  })
  socket.on('disconnect', () => {
    console.log('auth/del')
    const socketId = socket.id
    console.log(socketId)
    Auth.findOne({clients: socketId}, (err, doc) => {
      if (err) {
        console.log('auth/del: 查询出错')
      } else if (!doc) {
        console.log('auth/del: 查无此socket')
      } else if (doc !== []) {
        const index = doc.clients.indexOf(socketId)
        console.log(`index: ${index}`)
        doc.clients.splice(index, 1)
        doc.save((err) => console.log(err))
      } else {
        console.log('auth/del: 未知错误')
      }
    })
  })
  global.io = io
})

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/chat')
const db = mongoose.connection
db.once('error', () => console.log('mongo connect error'))
db.once('connected', () => console.log('mongo connect success'))

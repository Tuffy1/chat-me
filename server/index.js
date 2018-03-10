const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const authRouter = require('./router/auth')
const userRouter = require('./router/user')
const messageRouter = require('./router/message')
const mongoose = require('mongoose')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use('/api', authRouter)
app.use('/api/user', userRouter)
app.use('/api/message', messageRouter)

app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
  res.send(html)
})

http.listen(8088, () => {
  console.log('listening on 8088...')
})

io.on('connection', socket => {
  socket.on('chat message', (msg) => {
    console.log(msg)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  global.io = io
  console.log(socket.id)
})

mongoose.connect('mongodb://localhost/chat')
const db = mongoose.connection
db.once('error', () => console.log('mongo connect error'))
db.once('connected', () => console.log('mongo connect success'))

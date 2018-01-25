const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./router/user')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(userRouter)

app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
  res.send(html)
})

app.listen(8088)
console.log('success listen…………')

mongoose.connect('mongodb://localhost/chat')
const db = mongoose.connection
db.once('error', () => console.log('mongo connect error'))
db.once('connected', () => console.log('mongo connect success'))

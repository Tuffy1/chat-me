const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(api)
app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})

app.listen(8088)
console.log('success listen…………')

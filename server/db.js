const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/chat')

const db = mongoose.connection
db.once('error', () => console.log('mongo connect error'))
db.once('open', () => console.log('mongo connect success'))

const loginSchema = mongoose.Schema({
  username: String,
  password: String
})

const Models = {
  Login: mongoose.model('Login', loginSchema)
}
module.exports = Models

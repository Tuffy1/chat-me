const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String
})

const Models = {
  User: mongoose.model('User', userSchema)
}

mongoose.connect('mongodb://localhost/chat')
const db = mongoose.connection
db.once('error', () => console.log('mongo connect error'))
db.once('connected', () => console.log('mongo connect success'))

module.exports = Models

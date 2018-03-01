const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  nickname: {
    type: String,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    trim: true,
    unique: true
  },
  password: String,
  avatar: {
    type: String,
    default: ''
  },
  introduce: {
    type: String,
    default: '无',
    maxlength: 256
  },
  creatAt: {
    type: Date,
    default: Date.now
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }],
  chatNow: [{
    type: Schema.Types.Mixed
  }]
})

const User = mongoose.model('User', userSchema)

module.exports = User

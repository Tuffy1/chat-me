const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({
  nickname: {
    type: String,
    trim: true
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
  members: [{
    type: Schema.Types.Mixed
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'GroupMessage'
  }],
  tasks: [{
    type: Schema.Types.Mixed
  }]
})

const Group = mongoose.model('Group', GroupSchema)

module.exports = Group

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupMessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  content: {
    type: String,
    default: ''
  },
  isRead: {
    type: Boolean,
    default: false
  },
  sendTime: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    default: 'text'
  },
  readRole: {
    type: Number,
    default: 3
  },
  isImportant: {
    type: Boolean,
    default: false
  }
})

const GroupMessage = mongoose.model('groupMessage', GroupMessageSchema)

module.exports = GroupMessage

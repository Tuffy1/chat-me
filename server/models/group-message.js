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
  }
})

const GroupMessage = mongoose.model('Group', GroupMessageSchema)

module.exports = GroupMessage

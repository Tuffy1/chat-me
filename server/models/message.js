const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserMessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
  }
})

const UserMessage = mongoose.model('Message', UserMessageSchema)

module.exports = UserMessage

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  creator: {
    type: Schema.Types.Mixed,
    trim: true
  },
  creatAt: {
    type: Date,
    default: Date.now
  },
  startTime: {
    type: String,
    default: Date.now.toString()
  },
  endTime: {
    type: String,
    default: Date.now.toString()
  },
  content: {
    type: String,
    default: '无',
    maxlength: 256
  }
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task

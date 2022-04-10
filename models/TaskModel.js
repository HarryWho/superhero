const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task: {
    type: String,
    required: true
  },
  duedate: {
    type: Date,
    required: true
  },
  startdate: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  },

})

module.exports = mongoose.model('Task', TaskSchema);
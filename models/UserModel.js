const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  image: {
    type: String,
    default: '/img/avatar.jpeg'
  },
  role: {
    type: String,
    default: 'basic'
  }
})

module.exports = mongoose.model("User", UserSchema)
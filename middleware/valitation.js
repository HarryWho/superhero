const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')
module.exports = {
  Validate: function(body, done) {
    return new Promise((resolve, reject) => {
      let errors = []
      if (body.username == '' || body.email == '' || body.password == '' || body.password2 == '') {
        errors.push({ msg: 'All fields are required' })
      }
      if (body.password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' })
      }
      if (body.password != body.password2) {
        errors.push({ msg: 'Passwords do not match' })
      }

      resolve(errors)
    })
  },
  SaveRegisterDetails: function(body) {
    let newUser = {}
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(body.password, salt, function(err, hash) {
          if (err) reject(err, null)
          newUser = {
            username: body.username,
            email: body.email,
            password: hash
          }
          try {
            const user = new User(newUser)
            user.save()
            resolve(null, user)
          } catch (error) {
            reject('Something went wrong', null)
          }
        });
      });
    })
  }
}
const mongoose = require('mongoose')
module.exports = {
  ConnectDB: function() {
    mongoose.connect(process.env.MONGO_URI)
    const db = mongoose.connection;
    db.once('open', () => {
      console.log(`${process.env.MONGO_URI}: Connected...`)
    })
    db.on('error', (err) => {
      console.log(err.message)
    })
  }
}
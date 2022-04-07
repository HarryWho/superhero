const config = require('dotenv')
config.config({ path: './config/config.env' })
const express = require('express')
const http = require('http')
const { ConnectDB } = require('./config/DB')
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const app = express()
const server = http.createServer(app)

// bodyparser
app.use(express.urlencoded({ extended: false }))

// set static public folder
app.use(express.static('public'))

// view engine setup
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayout)

// session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,

}))


app.use('/', require('./controllers/home'))




// connect to mongo
ConnectDB()

// start server and listen on port 5000
server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
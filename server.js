const config = require('dotenv')
config.config({ path: './config/config.env' })


const express = require('express')
const http = require('http')
const { ConnectDB } = require('./config/DB')
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo');
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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
  }))
  // passport initialize
app.use(passport.initialize());
app.use(passport.session());

const { ensureAuth, ensureGuest } = require('./middleware/authentication')

app.use('/', require('./controllers/home'))
app.use('/dashboard', ensureAuth, require('./controllers/loggedin/dashboard'))



// connect to mongo
ConnectDB()

// start server and listen on port 5000
server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
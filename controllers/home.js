const express = require('express')
const router = express.Router();
/**
 * DESC: if not logedin go to login page else go to dashboard
 * GET: '/'
 */
router.get('/', (req, res) => {
  if (!req.isAuthenticated) {
    res.render('login')
  } else {
    res.render('home/dashboard')
  }
})

/**
 * DESC: register page
 * GET: '/register
 */
router.get('/register', (req, res) => {
  res.render('register')
})


module.exports = router
const express = require('express')
const router = express.Router();
const { Validate, SaveRegisterDetails } = require('../middleware/valitation');

const passport = require('passport')
const passportLocal = require('../config/passportLocal')
  /*** DESC: if not logedin go to login page else go to dashboard
   * GET: '/'
   */
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.render('login');
  } else {
    res.redirect('/dashboard');
  }
});

/*** DESC: Log using in with the local strategy
 * POST: '/'
 */
router.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {

    res.redirect('/');
  });

/** DESC: Logout
 * GET: '/logout'
 */
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
  /*** DESC: register page
   * GET: '/register
   */
router.get('/register', (req, res) => {
  res.render('register')
})

/*** DESC: post register form
 * POST: '/register' 
 */
router.post('/register', async(req, res) => {
  let errors = []
  await Validate(req.body, () => {}).then(async(errors) => {

    if (errors.length == 0) {
      await SaveRegisterDetails(req.body, function() {}).then((error, user) => {
        if (error) {
          errors.push({ msg: error })
          res.render('register', { errors: errors, fields: req.body })
        } else {

          res.redirect('/')
        }
      })
    } else {
      res.render('register', {
        errors: errors,
        fields: req.body
      });
    }
  })
})

module.exports = router
const express = require('express')
const router = express.Router();

/** DESC: get the article form
 * GET: '/article/new
 */
router.get('/new', (req, res) => {
  res.render('home/article_form', { user: req.user, action: '/article', caption: 'Save' })
})



module.exports = router
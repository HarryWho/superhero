const express = require('express')
const router = express.Router();
const Article = require('../../models/ArticleModel')
  /**DESC: loged in dashboard 
   * GET: '/dashboard'
   */
router.get('/', async(req, res) => {
  const articles = await Article.find({ author: req.user._id }).sort({ date: 'desc' })
    .populate({
      path: 'likes',
      select: ['username', 'image']
    });
  res.render('home/dashboard', { user: req.user, articles: articles });
});



module.exports = router;
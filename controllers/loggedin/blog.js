const express = require('express')
const router = express.Router();
const Article = require('../../models/ArticleModel')
  /** DESC: get all articles
   * GET: '/blog'
   */
router.get('/', async(req, res) => {
  const articles = await Article.find({ status: 'public' })
    .populate([{
      path: 'author',
      select: ['username', 'image']
    }, {
      path: 'likes',
      select: ['username', 'image']
    }]).sort({ date: 'desc' })
  res.render('blog/all_blogs', { user: req.user, articles: articles })
})

/** DESC: get single document with id :artcileID
 * GET: '/blog/view/:articleID'
 */
router.get('/view/:articleID', async(req, res) => {
  const article = await Article.findById(req.params.articleID)
    .populate([{
      path: 'author',
      select: ['username', 'image']
    }, {
      path: 'likes',
      select: ['username']
    }]);
  res.render('blog/blog', { user: req.user, article: article })
})



module.exports = router;
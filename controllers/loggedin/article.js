const express = require('express')
const router = express.Router();
const Article = require('../../models/ArticleModel')
  /** DESC: get the article form
   * GET: '/article/new
   */
router.get('/new', (req, res) => {
    res.render('home/article_form', { user: req.user, action: '/article', caption: 'Save' })
  })
  /** DESC: get article articleID and render the edit form
   * GET: '/artcile/edit/:articleID
   */
router.get('/edit/:articleID', async(req, res) => {
  const article = await Article.findById(req.params.articleID)
  res.render('home/article_form', { user: req.user, article: article, action: `/article/${article._id}?_method=PUT`, caption: 'Update' })
})

/** DESC save new article 
 * POST '/article'
 */
router.post('/', async(req, res) => {
  const article = new Article(req.body)
  await article.save()
  res.redirect('/dashboard')
})

/** DESC: UPDTAE articleID to mongodb
 * PUT: '/article/:articleID'
 */
router.put('/:articleID', async(req, res) => {
  await Article.findByIdAndUpdate(req.params.articleID, req.body)
  res.redirect('/dashboard')
})

/**DESC: get article by id and delete 
 * DELETE: '/article/articleID'
 */
router.delete('/:articleID', async(req, res) => {
  await Article.findByIdAndDelete(req.params.articleID)
  res.redirect('/dashboard')
})

module.exports = router
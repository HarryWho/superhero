const express = require('express')
const router = express.Router();
const Article = require('../../models/ArticleModel')
const Task = require('../../models/TaskModel')
  /**DESC: loged in dashboard 
   * GET: '/dashboard'
   */
router.get('/', async(req, res) => {
  const articles = await Article.find({ author: req.user._id }).sort({ date: 'desc' })
    .populate({
      path: 'likes',
      select: ['username', 'image']
    });
  const tasks = await Task.find({ user: req.user._id }).sort({ startdate: 'desc' });
  res.render('home/dashboard', { user: req.user, articles: articles, tasks: tasks });
});



module.exports = router;
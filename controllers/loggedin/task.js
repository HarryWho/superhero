const express = require('express')
const router = express.Router();
const Task = require('../../models/TaskModel')
  /** DESC: get task form
   * GET: '/task/new'
   */

router.get('/new', (req, res) => {
  res.render('home/task_form', { user: req.user })
})

/** DESC: Save task to DB
 * POST: '/task'
 */
router.post('/', async(req, res) => {
    const task = new Task(req.body)
    await task.save();
    res.redirect('/dashboard');
  })
  /** DESC: delete taskID
   * DELETE: '/task/:taskID
   */
router.delete('/:taskID', async(req, res) => {
  await Task.findByIdAndDelete(req.params.taskID)
  res.redirect('/dashboard')
})

module.exports = router;
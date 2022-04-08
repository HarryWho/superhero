const express = require('express')
const router = express.Router();

/**DESC: loged in dashboard 
 * GET: '/dashboard'
 */
router.get('/', (req, res) => {
  res.render('home/dashboard', { user: req.user });
});



module.exports = router;
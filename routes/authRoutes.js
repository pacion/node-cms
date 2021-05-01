const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/zaloguj', authController.login_get);
router.post('/zaloguj', authController.login_post);
router.get('/wyloguj', authController.logout_get);

module.exports = router;
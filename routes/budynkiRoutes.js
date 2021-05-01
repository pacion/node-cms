const { Router } = require('express');
const budynkiController = require('../controllers/budynkiController');

const router = Router();

router.get('*', budynkiController.renderPage);

module.exports = router;
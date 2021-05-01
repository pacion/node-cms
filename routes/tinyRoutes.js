const { Router } = require('express');
const tinyController = require('../controllers/tinyController');

const router = Router();

router.post('/:where', tinyController.upload);

module.exports = router;
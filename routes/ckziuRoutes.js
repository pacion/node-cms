const { Router } = require('express');
const ckziuController = require('../controllers/ckziuController');

const router = Router();

router.get('*', ckziuController.findContent);

module.exports = router;


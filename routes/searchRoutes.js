const { Router } = require('express');
const searchController = require('../controllers/searchController');

const router = Router();

router.get('*', searchController.search_get);



module.exports = router;
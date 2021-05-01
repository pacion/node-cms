const { Router } = require('express');
const newsController = require('../controllers/newsController');

const router = Router();

router.get('', (req, res) => {
    res.redirect('/aktualnosci/wszystkie?page=1');
});

router.get('/', (req, res) => {
    res.redirect('/aktualnosci/wszystkie?page=1');
});

router.get('/api/getTags', newsController.newsGetBuildings_get);
router.get('/api/getDates', newsController.getDates);

router.get('*', newsController.manyNews);

module.exports = router;
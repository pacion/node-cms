const { Router } = require('express');
const userController = require('../controllers/userController');
const cmsController = require('../controllers/cmsController');
const menuController = require('../controllers/menuController');
const budynkiController = require('../controllers/budynkiController');
const contactController = require('../controllers/contactController');
const footerSlideController = require('../controllers/footerSlideController');
const newsController = require('../controllers/newsController');
const contentController = require('../controllers/contentController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('', requireAuth, cmsController.index_get);

router.get('/user', requireAuth, cmsController.renderPage_get);
router.get('/getUsers', requireAuth, userController.getUsers_get);
router.post('/userAdd', requireAuth, userController.userAdd_post);
router.put('/userUpdateSingle', requireAuth, userController.userUpdateSingle_put);
router.post('/userChangePassword', requireAuth, userController.userChangePassword_post);
//router.delete('/userDelete', requireAuth, userController.userDelete_delete);

router.get('/managementColorful', requireAuth, cmsController.renderPage_get);
router.get('/getColorful', requireAuth, budynkiController.getColorful_get);
router.post('/colorfulMenuAdd', requireAuth, budynkiController.colorfulMenuAdd_post);
router.put('/colorfulMenuUpdateSingle', requireAuth, budynkiController.colorfulMenuUpdateSingle_put);
//router.delete('/colorfulMenuDelete', requireAuth, budynkiController.colorfulMenu_delete);

router.post('/contentAPI', requireAuth, contentController.contentAdd_post);
router.get('/contentAPI', requireAuth, contentController.getContent_get);
router.put('/contentAPI', requireAuth, contentController.contentUpdate_put);
//router.delete('/contentAPI', requireAuth, contentController.content_delete);

router.get('/managementContact', requireAuth, cmsController.renderPage_get);
router.get('/contactAPI', requireAuth, contactController.getContacts_get);
router.post('/contactAPI', requireAuth, contactController.contactAdd_post);
router.put('/contactAPI', requireAuth, contactController.contactUpdateSingle_put);
//router.delete('/contactAPI', requireAuth, contactController.contactDelete_delete);

router.get('/managementFooter', requireAuth, cmsController.renderPage_get);
router.get('/footerSlideAPI', requireAuth, footerSlideController.getFooterSlide_get);
router.post('/footerSlideAPI', requireAuth, footerSlideController.footerSlideAdd_post);
router.put('/footerSlideAPI', requireAuth, footerSlideController.footerSlideUpdateSingle_put);
//router.delete('/footerSlideAPI', requireAuth, footerSlideController.footerSlideDelete_delete);

router.get('/managementMenu', requireAuth, cmsController.renderPage_get);
router.get('/getMenu', requireAuth, menuController.getMenu_get);
router.post('/menuAdd', requireAuth, menuController.menuAdd_post);
router.put('/menuUpdateSingle', requireAuth, menuController.menuUpdateSingle_put);
//router.delete('/menuDelete', requireAuth, menuController.menuDelete_delete);

router.get('/managementNews', requireAuth, cmsController.renderPage_get);
router.get('/newsAPI', requireAuth, newsController.getNews_get);
router.post('/newsAPI', requireAuth, newsController.newsAdd_post);
router.put('/newsAPI', requireAuth, newsController.newsUpdateSingle_put);
//router.delete('/newsAPI', requireAuth, newsController.newsDelete_delete);
router.get('/newsGetBuildings', requireAuth, newsController.newsGetBuildings_get);
router.get('/newsGetContent', requireAuth, newsController.newsGetContent_get);

module.exports = router;
const router = require('express').Router();
const bidController = require('../controllers/BidController');
const { verify } = require('../middlewares/AuthMiddleware');
const { upload } = require('../middlewares/UploadMiddleware');

router.post('/create', verify, bidController.create);
router.get('/list', verify, bidController.listBids);
router.get('/list/all', bidController.listAllBids);
router.get('/list/:id', verify, bidController.listOneBid);
router.delete('/bid/:id', verify, bidController.deleteBid);

module.exports = router;

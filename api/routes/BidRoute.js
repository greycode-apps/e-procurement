const router = require('express').Router();
const bidController = require('../controllers/BidController');
const { verify } = require('../middlewares/AuthMiddleware');

router.post('/create', verify, bidController.create);
router.get('/list', bidController.listBids);
router.get('/list/all', bidController.listAllBids);
router.get('/list/:id', bidController.listOneBid);
router.delete('/bid/:id', bidController.deleteBid);

module.exports = router;

const router = require('express').Router();
const { verify } = require('jsonwebtoken');
const requestController = require('../controllers/RequestController');

router.post('/send', verify, requestController.makeRequest);
router.get('/show', verify, requestController.myRequest);
router.post('/accept/:id', requestController.acceptRequest);
router.post('/reject/:id', requestController.rejectRequest);

module.exports = router;

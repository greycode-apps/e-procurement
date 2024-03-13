const router = require('express').Router();
const paymentController = require('../controllers/PaymentController');
const { verify } = require('../middlewares/AuthMiddleware');

router.post('/payment', paymentController.makePayment);

module.exports = router;
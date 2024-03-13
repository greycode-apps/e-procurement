const router = require('express').Router();
const supplierController = require('../controllers/SupplierController');
const {verify} = require('../middlewares/AuthMiddleware')

router.post('/create', verify, supplierController.create);

module.exports = router;
const router = require('express').Router();
const instituteController = require('../controllers/InstituteController');
const { verify } = require('jsonwebtoken');


router.post('/create', verify, instituteController.create);

module.exports = router;
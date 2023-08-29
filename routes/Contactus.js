
const productController = require('../controllers/products');
const express = require('express');

const router = express.Router();

router.get('/contactus', productController.getUserData);
router.post('/contactus', productController.postUserData);

module.exports = router;
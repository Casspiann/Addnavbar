const express = require('express');
const productController = require('../controllers/products');
const router = express.Router();

// GET request handler for displaying the "Add Product" form
router.get('/add-product', productController.getAddProduct);

// POST request handler for adding a product
router.post('/add-product', productController.postAddProduct);

module.exports = router;
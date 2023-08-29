const path = require('path');
const express = require('express');

const rootdir = require('../util/path'); // Correct the import path
const router = express.Router();

// GET request handler for displaying the "Add Product" form
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootdir,'backrnd', 'views', 'addProduct.html'));
});

// POST request handler for adding a product
router.post('/add-product', (req, res, next) => {
    console.log(req.body); // Assuming you have body-parser or similar middleware enabled
    res.redirect('/'); // Redirect to the home page after adding the product
});

module.exports = router;

const path = require('path');
const express = require('express');

const rootdir = require('../util/path'); // Assuming this import is correct
const router = express.Router();

// GET request handler for the root path ("/")
router.get('/', (req, res, next) => {
    console.log("In another middleware");
    res.sendFile(path.join(rootdir,'backrnd', 'views', 'shop.html'));
    // res.send({ key1: 'value' });
    // next();
});

module.exports = router;
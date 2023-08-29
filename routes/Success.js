const path = require('path');
const express = require('express');
const productController = require('../controllers/products')
//const rootdir = require('../util/path'); // Assuming this import is correct
const router = express.Router();

// GET request handler for the root path ("/")
router.get('/success',productController.SuccessfullyUserAdd);
/*
router.post('/success',(req,res,next)=>{
        res.redirect('/');
})*/

module.exports = router;
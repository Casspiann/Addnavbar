const path = require('path');
const express = require('express');

const rootdir = require('../util/path'); // Assuming this import is correct
const router = express.Router();

// GET request handler for the root path ("/")
router.get('/success', (req, res, next) => {
   // console.log("In another middleware");
    res.sendFile(path.join(rootdir,'backrnd', 'views', 'Success.html'));
    // res.send({ key1: 'value' });
    // next();
});
/*
router.post('/success',(req,res,next)=>{
        res.redirect('/');
})*/

module.exports = router;
const path = require('path');
const express = require('express');



const rootdir = require('../util/path'); // Correct the import path
const router = express.Router();

router.get('/contactus',(req,res,next)=>{
    res.sendFile(path.join(rootdir,'backrnd','views','Contactus.html'))
});

router.post('/contactus',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/success');

})

module.exports = router;
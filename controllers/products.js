const path = require('path');
const rootdir = require('../util/path');

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(rootdir, 'backrnd', 'views', 'addProduct.html'));
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body); // Assuming you have body-parser or similar middleware enabled
    res.redirect('/'); // Redirect to the home page after adding the product
};

exports.getProduct = (req, res, next) => {
    console.log("In another middleware");
    res.sendFile(path.join(rootdir, 'backrnd', 'views', 'shop.html'));
};
/*exports.getUserData = (req,res,next)=>{
    res.sendFile(path.join(rootdir,'backrnd','views','Contactus.html'))
}*/
exports.getUserData = (req, res, next) => {
    res.sendFile(path.join(rootdir, 'backrnd', 'views', 'Contactus.html'));
};

exports.postUserData = (req,res,next)=>{
    console.log(req.body);
    res.redirect('/success');

};

exports.SuccessfullyUserAdd =  (req, res, next) => {
    // console.log("In another middleware");
     res.sendFile(path.join(rootdir,'backrnd', 'views', 'Success.html'));
     // res.send({ key1: 'value' });
     // next();
 };
 
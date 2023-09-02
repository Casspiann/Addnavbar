/*const path = require('path');
const rootdir = require('../util/path');
const Product = require('../models/product');
const User = require('../models/userDetail');

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(rootdir, 'backrnd', 'views', 'addProduct.html'));
};

exports.postAddProduct = (req, res, next) => {
    //console.log(req.body); 
    const product = new Product(req.body.title);
    product.save();
    // Assuming you have body-parser or similar middleware enabled
    res.redirect('/'); // Redirect to the home page after adding the product
};
exports.getproducts = (req, res, next) => {
    const proId = req.params.id;
    product.findById(proId,product=>{
        console.log(product);
    });
    res.redirect('/');
};

exports.getProduct = (req, res, next) => {
     const products = Product.fatchAll((products)=>{
       // console.log(products);
        //console.log("In another middleware");
        res.sendFile(path.join(rootdir, 'backrnd', 'views', 'shop.html'));
    });
    
};
exports.getUserData = (req,res,next)=>{
    res.sendFile(path.join(rootdir,'backrnd','views','Contactus.html'))
}
exports.getUserData = (req, res, next) => {
    res.sendFile(path.join(rootdir, 'backrnd', 'views', 'Contactus.html'));
};

exports.postUserData = (req,res,next)=>{
   // console.log(req.body);
    const Useres = new User(req.body.name,req.body.email);
    Useres.saveUser();
   
    res.redirect('/success');

};

exports.SuccessfullyUserAdd =  (req, res, next) => {
    //console.log(User.fatchUser())
    // console.log("In another middleware");
    User.fatchUser(users => {
        res.sendFile(path.join(rootdir, 'backrnd', 'views', 'Success.html'));
    });
     // res.send({ key1: 'value' });
     // next();
 };

 exports.getErrors = (req, res, next) => {
    res.sendFile(path.join(rootdir, 'backrnd', 'views', '404.html'));
};
*/
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req,res,next)=>{
  const proId = req.params.productId;
    Product.findById(proId,product=>{
       res.render('shop/product-detail',{
        product : product,
         pageTitle:product.title,
         path : '/products'
        })
    });
    
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
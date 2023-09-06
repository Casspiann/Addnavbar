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
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    console.log(rows);
  
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  
  })
  .catch(err => {
    console.log(err);
    // Handle the error gracefully, e.g., by sending an error page
    res.status(500).send('An error occurred');
  });

   
};

exports.getProduct = (req,res,next)=>{
  const proId = req.params.productId;
    Product.findById(proId)
    .then(([product])=>{
      console.log(product);
      res.render('shop/product-detail',{
        product : product[0],
         pageTitle:product.title,
         path : '/products'
        })
    })
    .catch(err=>{
      console.log(err);
    })
       
    
    
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    console.log(rows);
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => {
    console.log(err);
    // Handle the error gracefully, e.g., by sending an error page
    res.status(500).send('An error occurred');
  });

};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req,res,next)=>{
  const prodId = req.body.productId;
  Product.findById(prodId,(product)=>{
    Cart.addProduct(prodId,product.price);
  })
  res.redirect('/cart');
  
}

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
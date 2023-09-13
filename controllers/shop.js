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
  Product.findAll()
  .then((products)=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });

  }).catch(err=>{console.log(err)});
 /* Product.fetchAll()
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
*/
   
};

exports.getProduct = (req,res,next)=>{
  const proId = req.params.productId;
/*  Product.findAll({ where :{id : proId}})
  .then( (products)=>{
    res.render('shop/product-detail',{
      product : products[0],
       pageTitle:products[0].title,
       path : '/products'
      })

  }).catch(err=>{console.log(err)});

*/
    Product.findByPk(proId)
    .then(product =>{
     // console.log(product);
      res.render('shop/product-detail',{
        product : product,
         pageTitle:product.title,
         path : '/products'
        })
    })
    .catch(err=>{
      console.log(err);
    })
       
    
    
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });

  }).catch(err=>{console.log(err)});
 /* Product.fetchAll()
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
  });*/



};
exports.getCart = async (req, res, next) => {
  try {
    // Assuming req.user.getCart() is an asynchronous function that returns a cart
    const cart = await req.user.getCart();

    // Assuming cart.getProducts() is an asynchronous function that returns products in the cart
    const products = await cart.getProducts();

    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products,
    });
  } catch (err) {
    console.log(err);
    // Handle the error appropriately, e.g., send an error response or redirect to an error page.
    next(err);
  }
};
/*
exports.getCart = (req, res, next) => {
  console.log(req.user.Cart)
  req.user.getCart()
  .then(cart=>{return cart.getProducts()
  .then((products)=>{
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products:products
    })


  })
  .catch(err=>{console.log(err)});
})
  .catch(err=>{console.log(err)})
 // console.log(req,res,Cart);
  /*;
};*/
exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: prodId } });

    let product;
    if (products.length > 0) {
      product = products[0];
    }

    let newQuantity = 1;

    if (product) {
      let oldQuqntity = product.cartItem.quantity;
      newQuantity = oldQuqntity+1;
      // If the product is already in the cart, increase its quantity by 1
    } else {
      // If the product is not in the cart, add it to the cart
      product = await Product.findByPk(prodId);
      if (!product) {
        throw new Error('Product not found');
      }
    }

    // Add the product to the cart with the new quantity
    await cart.addProduct(product, { through: { quantity: newQuantity } });

    res.redirect('/cart');
  } catch (err) {
    console.log(err);
    // Handle the error appropriately, e.g., send an error response or redirect to an error page.
    next(err);
  }
};
/*
exports.postCart = (req,res,next)=>{
  const prodId = req.body.productId;
  let fetchedCart;

  req.user.getCart()
  .then((cart)=>{
    fetchedCart = cart;
    return cart.getProducts({where:{id:prodId}})
  })
  .then((products)=>{
    let product;
    if(products.length>0){
      product = products[0];
    }
    let newQuentity = 1;
    if(product){

    }
    return product.findByPk(prodId)
    .then( (product)=>{
      fetchedCart.addProduct(product,({through:{quentity:newQuentity}}));
    })
    .catch(err=>{console.log(err)});
  })
  .then(()=>res.redirect('/cart'))
  .catch(err=>{console.log(err)})
 /* Product.findById(prodId,(product)=>{
    Cart.addProduct(prodId,product.price);
  })
  res.redirect('/cart');
  
}
*/
exports.postCartDeleteProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  req.user.getCart()
  .then((cart)=>{
    return cart.getProducts({ where: { id: prodId } })
  })
  .then((products)=>{
   const  product = products[0];
   return product.cartItem.destroy();
  })
  .then((result)=>{
    res.redirect('/cart');
  })
  .catch(error=>{console.log(error)});
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
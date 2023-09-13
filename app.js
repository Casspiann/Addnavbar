const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require("./util/database");
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const cartItem = require('./models/cart-Item');


var cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const userRoutes = require('./routes/user');
const expensRoutes = require('./routes/expens');





app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
  User.findByPk(1).then(user=>{
    req.user = user;
    next();
  }).catch(error=>{console.log(error)});
})

app.use('/admin', adminRoute);
app.use(shopRoute);
app.use('/user',userRoutes);
app.use('/expenses',expensRoutes);



//const contactusRoute = require('./routes/Contactus');
//const successRoute = require('./routes/Success');
 // Ensure this is the last route

//app.use(contactusRoute);
//app.use(successRoute);

// Error handling middleware (should be the last)
app.use(errorController.get404);
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
  through: cartItem, // Specify the intermediary model
  //foreignKey: 'cartId', // Name of the foreign key in the CartItem table that references Cart
});
Product.belongsToMany(Cart, {
  through: cartItem, // Specify the intermediary model
  //foreignKey: 'productId', // Name of the foreign key in the CartItem table that references Product
})
sequelize.sync()
.then(result => {
  // Create a cart for the user
  return User.findByPk(1);
})
.then(user => {
  if (!user) {
    throw new Error('User not found.');
  }
  return user.createCart();
})
.then(cart => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err=>{
  console.log(err);
  app.listen(3000);
});



const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require("./util/database");


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

sequelize.sync().then((result)=>{
  console.log(result);
  app.listen(3000);
}).catch(err=>{
  console.log(err);
  app.listen(3000);
});



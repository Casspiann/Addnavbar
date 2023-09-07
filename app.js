const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const errorController = require('./controllers/error');
const sequelize = require("./util/database");
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

//const contactusRoute = require('./routes/Contactus');
//const successRoute = require('./routes/Success');
 // Ensure this is the last route

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin', adminRoute);
app.use(shopRoute);
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



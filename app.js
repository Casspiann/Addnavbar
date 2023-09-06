const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const errorController = require('./controllers/error');
const db = require("./util/database");
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

//const contactusRoute = require('./routes/Contactus');
//const successRoute = require('./routes/Success');
 // Ensure this is the last route

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoute);
app.use(shopRoute);
//app.use(contactusRoute);
//app.use(successRoute);

// Error handling middleware (should be the last)
app.use(errorController.get404);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

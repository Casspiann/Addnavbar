//const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const contactusRoute = require('./routes/Contactus');
const successRoute = require('./routes/Success');
//const errorController = require('../controllers/products');
//const routes = require('./rout');

//const server = http.createServer(routes.handler);
//console.log(routes.someText);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoute);
app.use(shopRoute);
app.use(contactusRoute);
app.use(successRoute);

app.use( (req, res, next) => {
     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
 });

app.listen(3000);
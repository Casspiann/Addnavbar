/*const fs = require('fs');
const path = require('path');
const rootdir = require('../util/path');
const p = path.join(rootdir, 'backrnd', 'data', 'product.json');

module.exports = class Product {
    constructor(title){
        this.title = title;

    }
    
    save (){
        this.id = Math.random().toString();
        
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                console.error(err);
                // Handle the error, possibly by returning or calling a callback
                return;
            }

            let products = [];
           if(!err){
                products = JSON.parse(fileContent);
            }
            
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (writeErr) => {
                if (writeErr) {
                    console.error(writeErr);
                    // Handle the write error, possibly by returning or calling a callback
                } else {
                    console.log('Product saved successfully.');
                }
            });
        });
    }
    static fatchAll(cb){
        
       fs.readFile(p,(error,data)=>{
            if(error){
                cb([]);
            }
       // console.log(data.toString());
       //console.log(JSON.parse(data))
         cb(JSON.parse,(data));
        });
        //return details

        //return products;
    }

    static findById(id,cb){
        getProductFromFile(products=>{
            const product = products.find(p=>p.id === id);
            cb(product)
        })
    } 

}*/
const fs = require('fs');
const path = require('path');
//const Cart = require('./cart');
const rootdir = require('../util/path');
const p = path.join(rootdir, 'backrnd', 'data', 'product.json');

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      const products = JSON.parse(fileContent); // Parse the fileContent
      cb(products);
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    // Add the id property
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => JSON.parse(prod.id) === JSON.parse(this.id));
        if (existingProductIndex !== -1) {
          console.log(existingProductIndex);
          const updatedProducts = [...products];
          updatedProducts[existingProductIndex] = this;
          fs.writeFile(p, JSON.stringify(updatedProducts), err => {
            if (err) {
              console.error('Error updating product:', err);
            }
          });
        } else {
          console.error('Product not found with ID:', this.id);
        }
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          if (err) {
            console.error('Error adding new product:', err);
          }
        });
      }
    });
  }
  static deleteById(id){
    //console.log(id);
    getProductsFromFile(products =>{
      const updatedProducts = products.filter( prod => prod.id !== id);
      //console.log(updatedProducts);
      fs.writeFile(p,JSON.stringify(updatedProducts),err =>{
        console.log(err);
      })
    });
  }


  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};

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
const rootdir = require('../util/path');
const p = path.join(rootdir, 'backrnd', 'data', 'product.json');


const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id,cb){
    getProductsFromFile(products=>{
        const product = products.find(p=>p.id === id);
        cb(product)
    })
} 
};
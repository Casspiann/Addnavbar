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

}*//*

const db= require('../util/database');
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
    return db.execute('INSERT INTO products (title , price , description , imageUrl) VALUES (?,?,?,?)',[this.title,this.price,this.description,this.imageUrl]);
   
  }
  static deleteById(id){
    //console.log(id);
    return db.exports("DELETE FROM products where id = ? ",[id]);
   
  }


  static fetchAll() {
   return  db.execute('SELECT * FROM products');
    
  }

  static findById(id) {
    return db.execute("SELECT * FROM products where id = ?",[id]);
    
  }
};
*/const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10, 2), // Assuming a decimal data type with 10 total digits and 2 decimal places
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;

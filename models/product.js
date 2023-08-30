const fs = require('fs');
const products = []
module.exports = class Product {
    constructor(title){
        this.title = title;

    }
    save (){
        products.push(this);
        const messageToWrite = `"title"+:+${this.title}`;

 // Write the message to the file using fs.writeFile
      fs.writeFile("message.txt", messageToWrite+" , ", { flag: 'a' }, (err) => {
       if (err) {
       console.log(err);
       res.status(500).send("Error writing to file");
       } 
       });

    }
    static fatchAll(){
        return products;
    }

}
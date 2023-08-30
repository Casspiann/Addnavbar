const fs = require('fs');
const Users = []
module.exports = class User {
    constructor(name,email){
        this.name = name;
        this.email = email;

    }
    saveUser (){
        Users.push(this.name+" : "+this.email);
        const messageToWrite = `${this.name}:${this.email}`;

 // Write the message to the file using fs.writeFile
            fs.writeFile("user.txt", messageToWrite+" , ", { flag: 'a' }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error writing to file");
            } 
            });
    }
    static fatchUser(){
        return Users;
    }

}
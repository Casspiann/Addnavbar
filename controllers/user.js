const User = require('../models/user');

exports.addUser = async(req,res,next)=>{

   
    // console.log("Hello", req.body, "request");
   try{
     if(!req.body.Phone){
       throw new Error("Phone no is Mendatory")
     }
     
   
   const name = req.body.Name;
   const email = req.body.Email;
   const phonenumber = req.body.Phone;
  
  const data =  await User.create({name:name , email:email, phonenumber:phonenumber});
   res.status(201).json({newUserDetail:data});
   }
   catch(err){
     res.status(500).json({error : err});
   }
}
exports.getUser = async(req,res,next)=>{
    try{
    const users = await User.findAll();
    res.status(200).json({allUsers : users});}
    catch(error){
      res.status(500).json({error:error});
    }
  }

exports.deleteUser =  async (req, res)=>{
    try{
      if(!req.params.id){
        res.status(400).json({err:"Id is Missing"});
      }
    const uid = req.params.id;
    //console.log("hello");
    console.log(uid);
    await User.destroy({where:{id:uid}});
    res.sendStatus(200);
    }
    catch(err){
      console.log(err);
      res.sendStatus(500).json({error:err});
    }
  
  }
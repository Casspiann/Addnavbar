const Expense = require('../models/expense');

exports.addExpense = async (req,res,next)=>{
    try{
    const Expens = req.body.expen;
    const Description = req.body.desc;
    const Category = req.body.cate;
   
   const data =  await Expense.create({expenceAmmount:Expens,description:Description,category:Category});
   //console.log(data);
    res.status(201).json({newExpence:data});
    }
    catch (error) {
      res.status(500).json({ error: error });
  }
}

exports.getExpense = async (req, res, next) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json({ allExpence: expenses });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.deleteExpense = async (req, res, next) => {
    try {
      const uid = req.params.id;
      
      if (!uid) {
        return res.status(400).json({ error: "Id is Missing" });
      }
  
      await Expense.destroy({ where: { id: uid } });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  }
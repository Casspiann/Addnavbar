const express = require('express');
const router = express.Router();
const expenceController = require('../controllers/expens');

router.post('/add-expens', expenceController.addExpense);
router.get('/get-expenses',expenceController.getExpense);
router.delete('delete-expens/:id',expenceController.deleteExpense);

module.exports = router;


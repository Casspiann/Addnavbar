const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'Tarun@123', {
  dialect: 'mysql', // Corrected spelling here
  host: 'localhost'
});

module.exports = sequelize;
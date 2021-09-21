const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Product;

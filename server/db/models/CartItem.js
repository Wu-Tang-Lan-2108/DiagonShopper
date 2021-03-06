const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
})

module.exports = CartItem;

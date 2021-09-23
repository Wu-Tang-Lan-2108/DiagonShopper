//this is the access point for all things database related!

const db = require('./db');

const Product = require('./models/Product');
const User = require('./models/User');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order')

//associations could go here!
Product.hasMany(CartItem);
CartItem.belongsTo(Product)
CartItem.belongsTo(Order)
Order.hasMany(CartItem)
Order.belongsTo(User)
User.hasMany(Order)

module.exports = {
  db,
  models: {
    User,
    CartItem,
    Product,
    Order
  },
};

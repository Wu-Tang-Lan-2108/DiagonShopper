//this is the access point for all things database related!

const db = require('./db');

const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');

//associations could go here!
User.hasMany(Cart);
Cart.belongsTo(User);
Product.belongsTo(Cart);
Cart.hasMany(Product);

module.exports = {
  db,
  models: {
    User,
    Cart,
    Product,
  },
};

const router = require('express').Router();
const {
  models: { User, Cart },
} = require('../db');
const Product = require('../db/models/Product');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: { model: Cart, include: { model: Product } },
    });
    res.send(user.carts);
  } catch (error) {
    next(error);
  }
});

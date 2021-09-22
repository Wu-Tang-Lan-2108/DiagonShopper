const router = require('express').Router();
const {
  models: { Cart, User },
} = require('../db');

// /carts/
router.post('/', async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    if (cart) {
      res.send(cart);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await Cart.update(req.body, { where: { id: req.params.id } });
    const cart = await Cart.findByPk(req.params.id);
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Cart.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

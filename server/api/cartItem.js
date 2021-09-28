const router = require('express').Router();
const {
  models: { CartItem, Product },
} = require('../db');

// /CartItems/
router.post('/', async (req, res, next) => {
  try {
    const conflictingCartItem = await CartItem.findOne({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId,
      },
    });
    if (conflictingCartItem) {
      conflictingCartItem.quantity += req.body.quantity;
      await conflictingCartItem.save();
      res.send(conflictingCartItem);
    } else {
      const cartItem = await CartItem.create(req.body);
      if (CartItem) {
        res.send(cartItem);
      } else {
        next();
      }
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await CartItem.update(req.body, { where: { id: req.params.id } });
    const cartItem = await CartItem.findByPk(req.params.id, {
      include: { model: Product },
    });
    res.send(cartItem);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await CartItem.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const router = require('express').Router();
const {
  models: { Order },
} = require('../db');
module.exports = router;

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    if (order) {
      res.send(order);
    } else next();
  } catch (error) {
    next(error);
  }
});

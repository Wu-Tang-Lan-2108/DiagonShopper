const router = require('express').Router();
const {
  models: { Order, CartItem, Product },
} = require('../db');
module.exports = router;

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: { model: CartItem, include: { model: Product } },
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/all', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
      },
      include: {
        model: CartItem,
        include: {
          model: Product,
        },
      },
    });
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// GETs current order for specified user
router.get('/:userId/current', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'CURRENT',
      },
      include: {
        model: CartItem,
        include: {
          model: Product,
        },
      },
    });
    if (order) {
      res.send(order);
    } else {
      const newOrder = await Order.create({ userId: req.params.userId });
      res.send(newOrder);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/past', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'PAST',
      },
      include: {
        model: CartItem,
        include: {
          model: Product,
        },
      },
    });
    res.send(orders);
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

router.put('/:orderId', async (req, res, next) => {
  try {
    await Order.update(req.body, { where: { id: req.params.orderId } });
    const order = await Order.findByPk(req.params.orderId, {
      include: { model: CartItem, include: { model: Product } },
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

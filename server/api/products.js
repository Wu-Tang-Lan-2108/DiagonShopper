const router = require('express').Router();
const {
  models: { Product, User },
} = require('../db');

const requireAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    console.log("middleware error");
    next(error);
  }
};

// /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

// /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// /api/products CREATE PRODUCT
router.post('/', async (req, res, next) => {
  try {
    //object of product info is req.body
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    //object of product update is req.body
    await Product.update(req.body, { where: { id: req.params.id } });
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireAdminToken, async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.type !== 'admin') {
      throw new Error('Unauthorized');
    }
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

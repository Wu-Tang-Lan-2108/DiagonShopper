const router = require('express').Router();
const {
  models: { Product },
} = require('../db');

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
    const product = await Product.create(req.body)
    res.json(product)
  } catch (err) { next(err) }
})

router.put('/:id', async (req, res, next) => {
  try {
    //object of product update is req.body
    const product = await Product.findByPk(req.params.id)
    product.update(req.body);
    res.json(product);
  } catch (err) { next(err) }
})

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const product = await Product.findByPk(req.body.id)
//   } catch (err) { next(err) }
// })

module.exports = router;

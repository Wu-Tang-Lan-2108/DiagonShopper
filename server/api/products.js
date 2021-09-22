const {models: {Product}} = require('../db');
const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

//api/products
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

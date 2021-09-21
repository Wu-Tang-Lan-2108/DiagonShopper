const router = require('express').Router()
const { models: { Cart, User }} = require('../db')

// /carts/
router.post('/', async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body)
    if(cart){
      res.send(cart)
    } else { next() }
  } catch (err) { next(err) }
})


module.exports = router

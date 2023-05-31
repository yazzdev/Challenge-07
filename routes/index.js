const express = require('express');
const router = express.Router();
const suppliers = require('./suppliers');
const components = require('./components');
const products = require('./products');

router.get('/', (req, res, next) => {
  res.status(200)
    .json({
      message: "Welcome at Home Page!!"
    });
});

router.use('/suppliers', suppliers);
router.use('/components', components);
router.use('/products', products);

module.exports = router;


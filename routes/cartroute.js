const express = require('express');
const router = express.Router();
const {CartDelete , CartGet, CartAdd} = require('../controller/controller');


router.post('/', CartAdd);
router.get('/', CartGet);
// DELETE item from cart by product ID
router.delete('/:id', CartDelete);

module.exports = router;


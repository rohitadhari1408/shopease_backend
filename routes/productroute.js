const express = require("express");
const { GetProducts ,AddProduct ,UpdateProduct,DeleteProduct } = require('../controller/controller');
const verifyToken= require('../middleware/authmiddleware')// Adjust the path as necessary

const router = express.Router();

router.get('/', GetProducts);

router.post('/', verifyToken, AddProduct);

router.put('/:id', verifyToken, UpdateProduct);

router.delete('/:id', verifyToken, DeleteProduct);

module.exports = router;
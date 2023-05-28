const productController = require('../controllers/product.controller');

const router = require('express').Router();

router.get('/getAllProducts', productController.getAllProducts);
router.post;

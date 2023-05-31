const router = require('express').Router();
const productController = require('../controllers/product.controller');

const isAuth = require('../middlewares/isAuth');
const isVendor = require('../middlewares/isVendor');
const productValidation = require('../validations/productValidation');

router.get('/getAllProducts', productController.getAllProducts);
router.get('/:productId', productController.getProductById);

router.post('/addNewProduct', isAuth, isVendor, productValidation, productController.createNewProduct);

router.put('/:productId', isAuth, isVendor, productValidation, productController.updateProduct);

module.exports = router;

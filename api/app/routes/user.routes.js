const router = require('express').Router();

const userController = require('../controllers/user.controller');
const isAdmin = require('../middlewares/isAdmin');
const isAuth = require('../middlewares/isAuth');
const isUser = require('../middlewares/isUser');

router.get('/getAllUsers', isAuth, isAdmin, userController.getAll);

router.post('/requestToVendor', isAuth, isUser, userController.requestToVendor);
router.post('/setVendor', isAuth, isAdmin, userController.setVendor);

module.exports = router;

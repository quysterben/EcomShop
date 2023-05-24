const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const authValidation = require('../middlewares/authValidation');
const loginValidation = require('../validations/loginValidation');

router.post('/signup', authValidation, authController.signup);
router.post('/signin', loginValidation, authController.signin);
router.post('/logout', authController.logout);

router.post('/refresh_token', authController.generateAccessToken);

module.exports = router;

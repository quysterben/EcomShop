const router = require('express').Router();

const uploadController = require('../controllers/upload.controller');
const isAuth = require('../middlewares/isAuth');

router.post('/upload', uploadController.uploadImages);

router.post('/destroy', uploadController.destroyImages);

module.exports = router;

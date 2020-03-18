const router = require('express').Router();
const ProductController = require('../controllers/ProductController.js');
router.get('/', ProductController.getAll);

module.exports = router;
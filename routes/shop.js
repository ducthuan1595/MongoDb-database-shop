const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// router.get('/', shopController.getIndex);

// router.get('/', shopController.getProducts);

// router.get('/products/:productId', shopController.getProduct);

router.get('/get-cart', shopController.getCart);

router.post('/add-cart', shopController.postCart);

router.post('/delete-cart', shopController.postCartDeleteProduct);

router.post('/post-order', shopController.postOrder);

router.get('/get-orders', shopController.getOrders);

module.exports = router;

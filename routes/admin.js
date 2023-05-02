const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
// router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/', adminController.getProducts);

// /admin/add-product => POST
router.post('/', adminController.postAddProduct);

router.get('/get-edit/:id', adminController.getEditProduct);

router.post('/edit/:id', adminController.postEditProduct);

router.post('/delete', adminController.postDeleteProduct);

module.exports = router;

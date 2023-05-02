const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.status(200).json({
        message: 'ok',
        products: products
      })
    })
    .catch(err => {
      res.status(400).json({
        message: err
      })
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.status(200).json({
        message: 'ok',
        product: product
      })
    })
    .catch(err => {
      res.status(400).json({
        message: err
      })
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.status(200).json({
        message: 'ok',
        products: products
      })
    })
    .catch(err => {
      res.status(400).json({ message: err })
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.status(200).json({
        message: 'ok',
        products: products
      })
    })
    .catch(err => {
      res.status(400).json({ message: err })
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.id;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      // console.log('add-cart', result)
      res.status(200).json({ message: 'ok', result: result })
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.status(200).json({ message: 'ok' })
    })
    .catch(err => res.status(400).json({ message: err }));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then(result => {
      res.status(200).json({ message: 'ok' })
    })
    .catch(err => res.status(400).json({ message: err }));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.status(200).json({ message: 'ok', orders: orders })
    })
    .catch(err => res.status(400).json({ message: err }));
};

const Product = require('../models/product');

// exports.getAddProduct = (req, res, next) => {
//   res.render('admin/edit-product', {
//     pageTitle: 'Add Product',
//     path: '/admin/add-product',
//     editing: false
//   });
// };

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );
  product
    .save()
    .then(result => {
      res.status(200).json({
        message: 'ok',
        product: result
      })
    })
    .catch(err => {
      res.status(400).json({
        message: err
      })
    });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.id;
  Product.findById(prodId)
    // Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.status(400).json({
          message: 'Error Edit product'
        })
      }
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

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.id;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImageUrl,
    prodId
  );
  product
    .save()
    .then(result => {
      res.status(200).json({
        message: 'ok',
        product: result
      })
    })
    .catch(err => {
      res.status(400).json({
        message: err
      })
    });
};

exports.getProducts = (req, res, next) => {
  console.log('running')
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

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  Product.deleteById(prodId)
    .then(() => {
      res.status(200).json({
        message: 'ok'
      })
    })
    .catch(err => {
      res.status(400).json({
        message: err
      })
    });
};

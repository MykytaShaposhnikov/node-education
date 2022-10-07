const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title,
    price,
    imageUrl,
    description
  }).then(()=>res.redirect('/admin/products')).catch(err=>console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
      .getProducts({where:{id:prodId}})
      .then( products => {
        const product=products[0]
        if (!product) {
            return res.redirect('/');
        }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId=req.body.productId
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
      .then( product => {
    product.title=updatedTitle;
    product.price=updatedPrice;
    product.description=updatedDesc;
    product.imageUrl=updatedImageUrl;
    return  product.save()
  })
      .then(()=>res.redirect('/admin/products'))
      .catch(err=>console.log(err))
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
      .then( product => product.destroy())
      .then(()=>res.redirect('/admin/products'))
      .catch(err=>console.log(err))
};


exports.getProducts = (req, res, next) => {
  req.user
      .getProducts()
      .then((prods)=>
          res.render('admin/products', {
            prods,
            pageTitle: 'Admin Products',
            path: '/admin/products'
          }))
      .catch(err=>console.log(err))
};

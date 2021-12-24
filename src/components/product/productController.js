const service = require('./productService');
const offerService = require("../offer/offerService");
const discountService = require("../discount/discountService");

/**
 * Lay 1 san pham len bang id
 *
 * @param req request
 * @param res respone
 * @returns {Promise<void>}
 */
exports.getById = async (req, res) => {
  try {
    const product = await service.getById(req.params.id);
    // const offers = await offerService.getAll();
    // const discounts = await discountService.getAll();
    // res.json(product);
    res.render('product/views/edit_product', { product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.paging = async (req, res) => {
  try {
    const products = await service.paging(req.query.page);
    // res.json(products);
    res.render('product/views/products', { products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * Lay tat ca offer va discount tu database
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.renderAddProductPage = async (req, res) => {
  try {
    res.render('product/views/add_product');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * Lay list cac san pham
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.getAll = async (req, res) => {
  try {
    const products = await service.getAll();
    // res.json(products);
    // res.render('products', { products });
    res.render('product/views/products', { products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
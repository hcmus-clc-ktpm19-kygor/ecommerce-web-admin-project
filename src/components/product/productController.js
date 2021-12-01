const service = require('./productService');

/**
 * Lay 1 san pham len bang id
 *
 * @param req request
 * @param res respone
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
  try {
    const product = await service.get(req.params.id);
    // res.json(product);
    res.render('detail', { product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.paging = async (req, res) => {
  try {
    const products = await service.paging(req.query.page);
    // res.json(products);
    res.render('products', { products });
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
    res.render('gallery', { products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Them san pham moi vao database tra ket qua neu thanh cong
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.insert = async (req, res) => {
  try {
    const newProduct = await service.insert(req.body);
    // res.status(201).json(newProduct);
    res.render('addproducts');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

/**
 * Tim va Update san pham da co trong database tra ket qua neu thanh cong
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.update = async (req, res) => {
  try {
    const updatedProduct = await service.update(req.params.id, req.body);
    // res.json(updatedProduct);
    res.render('editproducts');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

/**
 * Tim va xoa san pham trong database
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.delete = async (req, res) => {
  try {
    await service.delete(req.params.id);
    res.json({message: `Product ${req.params.id} has been deleted`});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
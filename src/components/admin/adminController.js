const service = require('./adminService');

/**
 * Lay 1 customer len bang id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
  try {
    const customer = await service.get(req.params.id);
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Them 1 customer moi vao database
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.insert = async (req, res) => {
  try {
    const newCustomer = await service.insert(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

/**
 * Tim va Update khach hang da co trong database tra ket qua neu thanh cong
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.update = async (req, res) => {
  try {
    req.session.passport.user = {
      ...req.session.passport.user,
      ...await service.update(req.params.id, req.body)
    };
    // res.json(updatedCustomer);
    res.redirect(`/account/${req.params.id}`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
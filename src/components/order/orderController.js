const service = require("./orderService");

exports.get = async (req, res) => {
  try {
    const order = await service.get(req.params.id);
    res.render("order/views/edit_order", { order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const orders = await service.getAll();
    // res.json(orders);
    res.render("order/views/order", { orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTop10BestSeller = async (req, res) => {
  try {
    const bestSeller = await service.getTop10BestSeller();
    res.json(bestSeller);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.insert = async (req, res) => {
  try {
    const newOrder = service.insert(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.stats(400).json({ message: err.message });
  }
};

/**
 * Tim va Update order da co trong database tra ket qua neu thanh cong
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.update = async (req, res) => {
  try {
    await service.update(req.params.id, req.body);
    res.redirect("/order");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Tim va xoa order trong database
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.delete = async (req, res) => {
  try {
    await service.delete(req.params.id);
    res.redirect("/order");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

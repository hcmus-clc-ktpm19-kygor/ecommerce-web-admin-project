const service = require('./orderService');

exports.get = async (req, res) => {
  try {
    const order = await service.getById(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const orders = await service.getAll();
    // res.json(orders);
    res.render('order/views/order', {
      orders,
      lost_update_message: req.flash("lost_update_message")[0],
      deadlock_message: req.flash("deadlock_message")[0],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
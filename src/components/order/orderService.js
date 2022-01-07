const model = require('./orderModel');
const util = require("./orderUtil");

exports.get = async (id) => {
  try {
    const order = await model.findById(id).lean();
    if (order === null) {
      return {mess: `Order id '${id}' not found`};
    }
    return order;
  } catch (err) {
    throw err;
  }
};

exports.getAll = async () => {
  try {
    return await model.find().lean();
  } catch (err) {
    throw err;
  }
};

exports.getSales = async () => {
  const orders = await model.find().lean();

  const todaySales = util.getSalesByDay(orders);
  const thisMonthSales = util.getSalesByMonth(orders);
  const thisQuarterSales = util.getSalesByQuarter(orders);
  const thisYearSales = util.getSalesByYear(orders);

  return { todaySales, thisMonthSales, thisQuarterSales, thisYearSales };
}

exports.insert = async (newOrder) => {
  const order = new model(newOrder);
  try {
    return await order.save();
  } catch (err) {
    throw err;
  }
}

/**
 * Tim order bang id, update thong tin san pham ton tai trong database
 *
 * @param id
 * @param updateOrder
 * @returns {Promise<{order: model}>}
 */
exports.update = async (id, updateOrder) => {
  try {
    return await model.findByIdAndUpdate(id, updateOrder,
        { new: true });
  } catch (err) {
    throw err;
  }
}

/**
 * Xoa san pham dang co trong database bang id
 *
 * @param id
 * @returns {Promise<{order: model}>}
 */
exports.delete = async (id) => {
  try {
    return await model.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}
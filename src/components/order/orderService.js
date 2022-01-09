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
    const orders = await model.find().lean();
    orders.forEach(e => {
      e.total_price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e.total_price);
      e.shipping_fee = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e.shipping_fee);
      e.name = e.customer.customer_name;
    })

    return orders;
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

exports.getTop10BestSeller = async () => {
  const orders = await model
    .find({}, { products: true, createdAt: true })
    .lean();
}

exports.insert = async (newOrder) => {
  try {
    const { products } = newOrder;

    const calculateTotalPrice = (prev, curr) => prev.price * prev.quantity + curr.price * curr.quantity;
    newOrder.total_price = products.length === 1 ? products[0].price : products.reduce(calculateTotalPrice);
    const order = new model(newOrder);

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
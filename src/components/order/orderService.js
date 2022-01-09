const orderModel = require('./orderModel');
const soldProductModel = require("../SoldProduct/SoldProduct");

const util = require("./orderUtil");

const dateFns = require("date-fns");

exports.get = async (id) => {
  try {
    const order = await orderModel.findById(id).lean();
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
    const orders = await orderModel.find().lean();
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
  const orders = await orderModel.find().lean();

  const todaySales = util.getSalesByDay(orders);
  const thisMonthSales = util.getSalesByMonth(orders);
  const thisQuarterSales = util.getSalesByQuarter(orders);
  const thisYearSales = util.getSalesByYear(orders);

  return { todaySales, thisMonthSales, thisQuarterSales, thisYearSales };
}

exports.getSalesInLast10Days = async () => {
  const result = [];
  for (let i = 10; i > 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);


    const orders = await orderModel
      .find(
        {
          createdAt: {
            $gte: dateFns.startOfDay(new Date(d)),
            $lt: dateFns.endOfDay(new Date(d)),
          },
        },
        { _id: true }
      )
      .lean();

    result.push({
      sales: orders.length,
      date: new Date(d)
    })
  }

  return result;
};

exports.getTop10BestSeller = async () => {
  const soldProducts = await soldProductModel.find().lean();
  soldProducts.sort((a, b) => b.quantity * b.total_price - a.quantity * a.total_price);
  return soldProducts.slice(0, 10);
}

exports.insert = async (newOrder) => {
  try {
    const { products } = newOrder;

    const calculateTotalPrice = (prev, curr) => prev.price * prev.quantity + curr.price * curr.quantity;
    newOrder.total_price = products.length === 1 ? products[0].price : products.reduce(calculateTotalPrice);
    const order = new orderModel(newOrder);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const soldProduct = await soldProductModel
          .findOne({ product_id: product._id })
          .lean();

      // Sản phẩm chưa được bán lần nào
      if (!soldProduct) {
        await soldProductModel.create({
          product_id: product._id,
          name: product.name,
          producer: product.producer,
          quantity: product.quantity,
          total_price: product.price,
        });
      } else { // Sản phẩm đã từng bán
        soldProduct.total_price += product.price * product.quantity;
        soldProduct.quantity += product.quantity;
        await soldProductModel.findOneAndUpdate(
            { product_id: product._id },
            soldProduct
        );
      }
    }

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
    return await orderModel.findByIdAndUpdate(id, updateOrder,
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
    return await orderModel.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}
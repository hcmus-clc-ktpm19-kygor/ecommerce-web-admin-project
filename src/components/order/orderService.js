const orderModel = require("./orderModel");

const orderDetailService = require('../OrderDetail/OrderDetailService');
const productService = require('../product/productService');

exports.getById = async (id) => {
  try {
    return await orderModel.findByPk(id);
  } catch (err) {
    throw err;
  }
};

exports.getAll = async () => {
  try {
    return await orderModel.findAll({ raw: true });
  } catch (err) {
    throw err;
  }
};

exports.insert = async (newOrder) => {
  try {
    const orderDetail = await orderDetailService.getById(newOrder.order_id, newOrder.product_id);
    const product = await productService.getById(orderDetail.product_id);

    newOrder.price = orderDetail.quantity * product.price;

    return await orderModel.create(newOrder);
  } catch (err) {
    throw err;
  }
};

/**
 * Tim order bang id, update thong tin san pham ton tai trong database
 *
 * @param id
 * @param updateOrder
 * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
 */
exports.update = async (id, updateOrder) => {
  try {
    await orderModel.update(updateOrder, { where: { id } });
    return await orderModel.findOne({ where: { id }, raw: true });
  } catch (err) {
    throw err;
  }
};

/**
 * Xoa san pham dang co trong database bang id
 *
 * @param id
 * @returns {Promise<{order: model}>}
 */
exports.delete = async (id) => {
  try {
    await orderModel.destroy({ where: id });
    return await orderModel.findOne({ where: { id }, raw: true });
  } catch (err) {
    throw err;
  }
};
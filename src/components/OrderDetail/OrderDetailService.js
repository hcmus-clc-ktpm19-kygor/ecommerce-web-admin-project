const model = require("./OrderDetailModel");

exports.getById = async (order_id, product_id) => {
  try {
    const orderDetail = await model.findOne({
      where: { order_id, product_id },
      raw: true,
    });
    if (orderDetail === null) {
      return { mess: `Product id '${id}' not found` };
    }
    return orderDetail;
  } catch (err) {
    throw err;
  }
};

exports.getAll = async () => {
  try {
    return await model.findAll();
  } catch (err) {
    throw err;
  }
};

exports.insert = async (newOrderDetail) => {
  try {
    await model.create(newOrderDetail);
  } catch (err) {
    throw err;
  }
};

/**
 * Tim order detail bang id, update thong tin san pham ton tai trong database
 *
 * @param order_id
 * @param product_id
 * @param updateOrderDetail
 * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
 */
exports.update = async (order_id, product_id, updateOrderDetail) => {
  try {
    return await model.update(updateOrderDetail, {
      where: { order_id, product_id },
    });
  } catch (err) {
    throw err;
  }
};

/**
 * Xoa order detail dang co trong database bang id
 *
 * @returns {Promise<number>}
 */
exports.delete = async (order_id, product_id) => {
  try {
    return await model.destroy({ where: { order_id, product_id } });
  } catch (err) {
    throw err;
  }
};

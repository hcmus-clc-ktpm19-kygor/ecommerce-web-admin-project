const model = require("./productModel");
const { option } = require("handlebars-helpers/lib/misc");
const {where} = require("sequelize");

/**
 * Lay 1 product bang id <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @param id {@link String}
 * @returns {Promise<{product: model}|{mess: string}>}
 */
exports.getById = async (id) => {
  try {
    return await model.findByPk(id, { raw: true });
  } catch (err) {
    throw err;
  }
};

/**
 * Lay list cac san pham <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
 */
exports.getAll = async () => {
  try {
    return await model.findAll();
  } catch (err) {
    throw err;
  }
};

exports.getByPartner = async (partnerId, branchId) => {
  try {
    return await model.findOne({
      where: {
        tax_id: partnerId,
        branch_id: branchId,
      },
      raw: true,
    });
  } catch (err) {
    throw err;
  }
};

/**
 * Them san pham moi vao database va tra ve ket qua san pham da them <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @returns {Promise<{product: model}>}
 * @param product
 */
exports.insert = async (product) => {
  try {
    const currProduct = await model.findByPk(product._id);
    if (currProduct) {
      await model.update(
        { stock: currProduct.stock + parseInt(product.stock) },
        { where: { _id: product._id } }
      );
    } else {
      await model.create(product);
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Tim san pham bang id, update thong tin san pham ton tai trong database
 *
 * @param id
 * @param updateProduct
 * @returns {Promise<{product: model}>}
 */
exports.update = async (id, updateProduct) => {
  try {
    await model.update(updateProduct, { where: { _id: id } });
  } catch (err) {
    throw err;
  }
};

/**
 * Xoa san pham dang co trong database bang id
 *
 * @param id
 * @returns {Promise<number>}
 */
exports.delete = async (id) => {
  try {
    return await model.destroy({ where: { _id: id } });
  } catch (err) {
    throw err;
  }
};

const model = require('./adminModel');

/**
 * Lay 1 customer len bang id
 * @param id
 * @returns {Promise<{mess: string}|Model<TModelAttributes, TCreationAttributes>>}
 */
exports.get = async (id) => {
  try {
    const admin = await model.findByPk(id);
    if (admin === null) {
      return { mess: `Admin id '${id}' not found` };
    }
    return admin;
  } catch (err) {
    throw err;
  }
};

/**
 * Them 1 customer moi vao database
 * @param newAdmin
 * @returns {Promise<Model<TModelAttributes, TCreationAttributes>>}
 */
exports.insert = async (newAdmin) => {
  try {
    const customer = model.build(newAdmin);
    return await customer.save();
  } catch (err) {
    throw err;
  }
}

/**
 * Cap nhat thong tin khach hang co trong database
 *
 * @param id
 * @param updateCustomer
 * @returns {Promise<[Model<TModelAttributes, TCreationAttributes>, boolean]>}
 */
exports.update = async (id, updateCustomer) => {
  try {
    delete updateCustomer.dob;
    delete updateCustomer.sex;

    await model.update(updateCustomer, {
      where: { id },
    });

    return await model.findOne( { where: { id }, raw: true } );
  } catch (err) {
    throw err;
  }
}
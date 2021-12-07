const model = require('./adminModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Lay admin len tu database bang id
 * @param id {@link mongoose.Types.ObjectId}
 * @returns {Promise<*|{mess: string}>}
 */
module.exports.getById = async (id) => {
  try {
    const admin = await model.findById(id);
    if (admin === null) {
      return { mess: `Admin id '${id}' not found` };
    }
    return admin;
  } catch (err) {
    throw err;
  }
};

/**
 * Lay admin len tu database bang username
 *
 * @param username
 * @returns {Promise<*>}
 */
module.exports.getByUsername = async (username) => {
  try {
    return await model.findOne({username});
  } catch (err) {
    throw err;
  }
};

/**
 * Xac thuc password
 *
 * @param user admin lay tu database
 * @param password password dang nhap
 * @returns {Promise<*>}
 */
// module.exports.validatePassword = async (user, password) => {
//   return await bcrypt.compare(password, user.password);
// }

/**
 * Phan trang cac account, moi trang 5 account
 * @param page
 * @returns {Promise<void>}
 */
exports.paging = async (page) => {
  try {
    let perPage = 5; // số lượng sản phẩm xuất hiện trên 1 page
    page = page || 1;

    return await model
    .find() // find tất cả các data
    .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage);
  } catch (err) {
    throw err;
  }
};

/**
 * Lay 1 list cac san pham tu database
 * @returns {Promise<[account: model]>}
 */
module.exports.getAll = async () => {
  try {
    return await model.find();
  } catch (err) {
    throw err;
  }
};

/**
 * Them san pham moi vao database
 * @param newAccount
 * @returns {Promise<{account: model}>}
 */
module.exports.insert = async (newAccount) => {
  const account = new model(newAccount);
  try {
    return await account.save();
  } catch (err) {
    throw err;
  }
}

/**
 * Cap nhat thong tin tai khoan co trong database
 *
 * @param id
 * @param updateAccount
 * @returns {Promise<{account: model}>}
 */
exports.update = async (id, updateAccount) => {
  try {
    return await model.findByIdAndUpdate(id, updateAccount,
        { new: true });
  } catch (err) {
    throw err;
  }
}

/**
 * Tim tai khoan bang id xoa khoi database
 * @param id
 * @returns {Promise<*>}
 */
exports.delete = async (id) => {
  try {
    return await model.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}
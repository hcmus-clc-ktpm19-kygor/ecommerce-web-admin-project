const model = require('./adminModel');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

/**
 * Lay admin len tu database bang id
 * @param id {@link mongoose.Types.ObjectId}
 * @returns {Promise<*|{mess: string}>}
 */
module.exports.getById = async (id) => {
  try {
    const account = await model.findById(id);
    if (account === null) {
      return { mess: `Account id '${id}' not found` };
    }
    return account;
  } catch (err) {
    throw err;
  }
};

/**
 * Lay admin len tu database bang username
 * @returns {Promise<*|{mess: string}>}
 * @param username
 */
module.exports.getByUsername = async (username) => {
  try {
    const account = await model.findOne({ username });
    if (account === null) {
      return { mess: `Admin '${id}' not found` };
    }
    return account;
  } catch (err) {
    throw err;
  }
};

/**
 * Xac thuc passsword
 * @param user user da dang nhap
 * @param password password nhap vao
 * @returns {Promise<*>}
 */
module.exports.validatePassword = async (user, password) => {
  return await bcrypt.compare(password, user.password);
}

/**
 * Phan trang cac account, moi trang 5 admin
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
 * Lay 1 list cac admin tu database
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
module.exports.insert = async ({ username, password, phone }) => {
  try {
    const isExisted = await model.exists({ username });
    if (isExisted) {
      return null;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = new model({ username, password: hashedPassword, phone });
      return await admin.save();
    }
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
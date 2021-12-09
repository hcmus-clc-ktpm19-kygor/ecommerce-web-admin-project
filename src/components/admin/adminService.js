const model = require('./adminModel');
const bcrypt = require('bcrypt');
const faker = require('faker');
const email = require('../../config/email');

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
    return await model.findOne({ username });
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
 * @returns {Promise<{account: model}>}
 * @param newAdmin
 */
module.exports.insert = async (newAdmin) => {
  try {
    const password = faker.internet.password();

    await email.sendPassword(newAdmin.email, password);

    newAdmin.username = newAdmin.email;
    newAdmin.password = await bcrypt.hash(password, 10);

    const admin = new model(newAdmin);
    return await admin.save();
  } catch (err) {
    throw err;
  }
}

/**
 * Cap nhat thong tin tai khoan co trong database
 *
 * @param username
 * @param updateAccount
 * @returns {Promise<{address, phone, name, email}>}
 */
exports.update = async (username, updateAccount) => {
  try {
    const { name, phone, address, email } = await model.findOneAndUpdate({ username }, updateAccount,
        { new: true });

    return { name, phone, address, email };
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
    const admin = await model.findById(id);

    if (admin.username !== 'admin') {
      return await model.findByIdAndDelete(id, { new: true });
    }
    return null;
  } catch (err) {
    throw err;
  }
}
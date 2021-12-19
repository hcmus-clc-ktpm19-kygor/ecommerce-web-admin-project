const bcrypt = require('bcrypt');
const faker = require('faker');
const ObjectId = require('mongoose').Types.ObjectId;

const partnerService = require("./partnerService");

const partnerModel = require('./partnerModel');
const accountModel = require('../account/accountModel');

/**
 * Lay partner len tu database bang id
 * @param id {@link mongoose.Types.ObjectId}
 * @returns {Promise<*|{mess: string}>}
 */
module.exports.getById = async (id) => {
  try {
    return await partnerModel.findByPk(id);
  } catch (err) {
    throw err;
  }
};

/**
 * Lay partner len tu database bang username
 * @returns {Promise<*|{mess: string}>}
 * @param username
 */
module.exports.getByUsername = async (username) => {
  try {
    return await accountModel.findOne({ where: { username } });
  } catch (err) {
    throw err;
  }
};

/**
 * Xac thuc passsword
 * @param userPassword
 * @param password password nhap vao
 * @returns {Promise<*>}
 */
module.exports.validatePassword = async (userPassword, password) => {
  return await bcrypt.compare(password, userPassword);
}

/**
 * Lay 1 list cac partner tu database
 * @returns {Promise<[account: model]>}
 */
module.exports.getAll = async () => {
  try {
    return await partnerModel.find().lean();
  } catch (err) {
    throw err;
  }
};

/**
 * Them san pham moi vao database
 * @returns {Promise<{await: *}>}
 * @param newPartner
 */
exports.insert = async (newPartner) => {
  try {
    const rawPassword = faker.internet.password();

    newPartner.username = newPartner.email;
    newPartner.password = await bcrypt.hash(rawPassword, 10);

    const partner = partnerModel.build(newPartner);
    const addedPartner = await partner.save();
    return { partner: addedPartner , rawPassword };
  } catch (err) {
    throw err;
  }
}

/**
 * Cap nhat thong tin tai khoan co trong database
 *
 * @param id
 * @param updatePartner
 * @returns {Promise<{address, phone, name, email}>}
 */
exports.update = async (id, updatePartner) => {
  try {
    await partnerModel.update(updatePartner, { where: { id } });

    return await partnerModel.findOne({ where: { id }, raw: true });
  } catch (err) {
    throw err;
  }
};

exports.changePassword = async (id, newPassword) => {
  try {
    const { old_password, new_password, confirm_password } = newPassword;
    const admin = await partnerModel.findById(ObjectId.createFromHexString(id));

    const isPasswordValid = await partnerService.validatePassword(admin.password, old_password);
    if (!isPasswordValid) {
      return "Mật khẩu cũ không hợp lệ";
    }
    if (new_password !== confirm_password) {
      return "Xác nhận mật khẩu mới không hợp lệ";
    }

    await partnerModel.findByIdAndUpdate(id, { password: await bcrypt.hash(new_password, 10)});
  } catch (err) {
    throw err;
  }
};

/**
 * Tim tai khoan bang id xoa khoi database
 * @param id
 * @returns {Promise<*>}
 */
exports.delete = async (id) => {
  try {
    const admin = await partnerModel.findById(id);

    if (admin.username !== 'admin') {
      return await partnerModel.findByIdAndDelete(id, { new: true });
    }
    return null;
  } catch (err) {
    throw err;
  }
}

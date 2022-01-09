const bcrypt = require('bcrypt');
const faker = require('faker');
const ObjectId = require('mongoose').Types.ObjectId;

const model = require('./adminModel');
const adminService = require("./adminService");
const cloudinary = require('../../config/cloudinary.config');

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
 * @param userPassword
 * @param password password nhap vao
 * @returns {Promise<*>}
 */
module.exports.validatePassword = async (userPassword, password) => {
  return await bcrypt.compare(password, userPassword);
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
module.exports.getAll = async (exceptId) => {
  try {
    return await model
      .find({ _id: { $nin: [ObjectId.createFromHexString(exceptId)] } })
      .lean();
  } catch (err) {
    throw err;
  }
};

/**
 * Them san pham moi vao database
 * @returns {Promise<{await: *}>}
 * @param newAdmin
 */
module.exports.insert = async (newAdmin) => {
  try {
    const rawPassword = faker.internet.password();

    newAdmin.username = newAdmin.email;
    newAdmin.password = await bcrypt.hash(rawPassword, 10);

    const admin = new model(newAdmin);
    const addedAdmin = await admin.save();
    return { admin: addedAdmin , rawPassword };
  } catch (err) {
    throw err;
  }
}

/**
 * Cap nhat thong tin tai khoan co trong database
 *
 * @param id
 * @param updateAccount
 * @returns {Promise<{address, phone, name, email}>}
 */
exports.update = async (id, updateAccount) => {
  try {
    return await model.findByIdAndUpdate(
      id,
      updateAccount,
      { new: true }
    ).lean();
  } catch (err) {
    throw err;
  }
};

exports.changeAvatar = async (id, file) => {
  try {
    // Upload avatar len cloudinary
    let result;
    if (file) {
      result = await cloudinary.uploader.upload(file.path, {
        public_id: id,
        folder: "admin_avatar",
        use_filename: true,
      });
    }

    /*
     Lay avatar url
     Neu khong co avatar duoc up len, url bo trong
    */
    const { url } = result ?? "";
    // Update user's info
    await model
      .findByIdAndUpdate(id, { avatar_url: url }, { new: true })
      .lean();

    return url;
  } catch (err) {
    throw err;
  }
}

exports.changePassword = async (id, newPassword) => {
  try {
    const { old_password, new_password, confirm_password } = newPassword;
    const admin = await model.findById(ObjectId.createFromHexString(id));

    const isPasswordValid = await adminService.validatePassword(admin.password, old_password);
    if (!isPasswordValid) {
      return "Mật khẩu cũ không hợp lệ";
    }
    if (new_password !== confirm_password) {
      return "Xác nhận mật khẩu mới không hợp lệ";
    }

    await model.findByIdAndUpdate(id, { password: await bcrypt.hash(new_password, 10)});
  } catch (err) {
    throw err;
  }
};

/**
 * Tim tai khoan bang id xoa khoi database
 * @param id
 * @returns {Promise<*>}
 */
exports.banAdmin = async (id, status) => {
  try {
    const admin = await model.findById(id);

    if (admin.username !== 'admin') {
      return await model.findByIdAndUpdate(
        id,
        { status: !admin.status },
        { new: true }
      );
    }
    return null;
  } catch (err) {
    throw err;
  }
}

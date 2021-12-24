const model = require("./accountModel");
const bcrypt = require("bcrypt");

const adminService = require("../admin/adminService");
const accountModel = require("./accountModel");
const accountService = require("./accountService");

module.exports.getAll = async () => {
  try {
    return await model.findAll({ raw: true });
  } catch (err) {
    throw err;
  }
};

/**
 * Lay 1 account len tu database bang id
 * @returns {Promise<*|{mess: string}>}
 */
module.exports.getById = async (id) => {
  try {
    const account = await model.findByPk(id);
    if (account === null) {
      return { mess: `Account id '${id}' not found` };
    }
    return account;
  } catch (err) {
    throw err;
  }
};

/**
 * Lay 1 account len tu database bang username
 * @param username
 * @returns {Promise<*|{mess: string}>}
 */
module.exports.getByUsername = async (username) => {
  try {
    return await model.findOne({ where: { username } });
  } catch (err) {
    throw err;
  }
};

/**
 * Xac thuc password
 * @param user
 * @param password
 * @returns {Promise<*>}
 */
module.exports.validatePassword = async (user, password) => {
  return await bcrypt.compare(password, user.password);
};

/**
 * Them account moi vao database
 * @param newAccount
 * @returns {Promise<string>}
 */
module.exports.insert = async (newAccount) => {
  try {
    const isExistedUsername = await model.findOne({
      where: { username: newAccount.username },
    });

    if (isExistedUsername) {
      return null;
    } else {
      const hashedPassword = await bcrypt.hash(newAccount.password, 10);
      // Tạo tài khoản
      const addedAccount = await model.create({
        username: newAccount.username,
        password: hashedPassword,
      });

      // Tạo khách hàng
      await adminService.insert({ id: addedAccount._id });

      return addedAccount;
    }
  } catch (err) {
    throw err;
  }
};

exports.changePassword = async (id, newPassword) => {
  try {
    const { old_password, new_password, confirm_password } = newPassword;
    const admin = await accountModel.findByPk(id);

    const isPasswordValid = await accountService.validatePassword(
      admin.password,
      old_password
    );
    if (!isPasswordValid) {
      return "Mật khẩu cũ không hợp lệ";
    }
    if (new_password !== confirm_password) {
      return "Xác nhận mật khẩu mới không hợp lệ";
    }

    await accountModel.update(
      { password: await bcrypt.hash(new_password, 10) },
      { where: { id } }
    );
  } catch (err) {
    throw err;
  }
};

/**
 * Cap nhat thong tin tai khoan co trong database
 *
 * @param id user's id
 * @param updateUser
 * @param file
 * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
 */
exports.update = async (id, updateUser, file) => {
  try {
    // Upload avatar len cloudinary
    let result;
    if (file) {
      result = await cloudinary.uploader.upload(file.path, {
        public_id: id,
        folder: "user_avatar",
        use_filename: true,
      });
    }

    /*
         Lay avatar url
         Neu khong co avatar duoc up len, url bo trong
        */
    const { url } = result ?? "";
    // Update user's info
    updateUser.avatar_url = url;
    return await model.update(updateUser, { where: { id } });
  } catch (err) {
    throw err;
  }
};

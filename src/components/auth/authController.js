const adminService = require('../admin/adminService');

/**
 * Render trang Login
 * @param req request
 * @param res response
 */
exports.renderLogin = (req, res) => {
  const invalidAccount = req.query['invalid-account'] !== undefined;
  res.render('login', { invalidAccount, layout: false });
}

/**
 * Logout
 * @param req request
 * @param res response
 */
exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
}

/**
 * Dang ky tai khoan
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.register = async (req, res) => {
  try {
    // Thêm account mới vào database
    const newAccount = await adminService.insert(req.body);

    const { email } = req.body;

    if (!newAccount) {
      res.redirect('/register');

      /* NOTE: chỗ này để lại thông báo tài khoản đã tồn tại nhưng chưa biết làm sao
      * tạm để đây
      * */
      res.render('register', {
        email,
        message: 'Username already existed'
      });
    } else {
      res.redirect('/login');
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}
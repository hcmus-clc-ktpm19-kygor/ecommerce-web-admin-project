const passport = require("../../config/passport");
const accountService = require('../admin/adminService');

/**
 * Render trang Login
 * @param req request
 * @param res response
 */
exports.renderLogin = (req, res) => {
  const invalidAccount = req.query['invalid-account'] !== undefined;
  res.render('login', { invalidAccount });
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
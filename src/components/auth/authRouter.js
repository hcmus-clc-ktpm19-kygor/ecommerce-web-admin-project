const express = require("express");
const router = express.Router();
const passport = require("../../config/passport.config");
const authController = require("./authController");

// GET methods
// Render trang login
router.get('/login', authController.renderLogin);
// Logout
router.get('/logout', authController.logout);

// POST methods
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login?invalid-account'
}))
router.post('/register', authController.register);


module.exports = router;

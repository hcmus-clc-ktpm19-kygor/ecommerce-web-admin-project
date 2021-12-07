const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const adminService = require('../components/admin/adminService');

passport.use(new LocalStrategy(
    async (username, password, done) => {
      const user = await adminService.getByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username' })
      }
      if (!await adminService.validatePassword(user, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(async function(user, done) {
  done(null, user);
});

module.exports = passport;
const passportConfig = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const adminService = require('../components/partner/partnerService');

passportConfig.use(new LocalStrategy(
    async (username, password, done) => {
      const user = await adminService.getByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username' })
      }
      if (!await adminService.validatePassword(user.password, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }
));

passportConfig.serializeUser(function(user, done) {
  done(null, {
    username: user.username,
  });
});

passportConfig.deserializeUser(async function(user, done) {
  done(null, user.username);
});

module.exports = passportConfig;
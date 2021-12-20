const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const adminService = require('../components/admin/adminService');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await adminService.getByUsername(username);
        if (!user) {
            return done(null, false, {message: 'Incorrect username'})
        }
        if (!await adminService.validatePassword(user.password, password)) {
            return done(null, false, {message: 'Incorrect password.'});
        }
        if (!user.status) {
            return done(null, false, {message: 'Banned admin.'});
        }
        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, {
        _id: user._id,
        username: user.username,
        name: user.name,
        phone: user.phone,
        address: user.address,
        email: user.email,
        avatar_url: user.avatar_url,
    });
});

passport.deserializeUser(async function (user, done) {
    done(null, user);
});

module.exports = passport;
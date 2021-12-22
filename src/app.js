require('./helpers/helper');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');

const session = require('express-session');
const passport = require("./config/passport.config");
const flash = require('connect-flash');

const indexRouter = require('./routes/index');

const authRouter = require("./components/auth/authRouter");
const adminRouter = require("./components/admin/adminRouter");
const orderRouter = require('./components/order/orderRouter');
const productRouter = require('./components/product/productRouter');

const loggedInGuard = require('./middlewares/loggedInGuard');

// try to connect to database
const { sequelize } = require('./config/database.config');
sequelize.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => {
    console.error(error.message);
    process.exit(-1);
  })

const app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, "components")]);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));


// Passport middlewares
app.use(session({ secret: process.env.SESSION_SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Authentication middleware
app.use('/', authRouter);

// Secure middleware
app.all('/*', loggedInGuard);

// Store account
app.use(function (req, res, next) {
  res.locals.admin = req.user;
  next();
})

// Router middlewares
app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

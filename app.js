var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var main = require('./app_server/routes/main');
var index = require('./app_server/routes/index');
//var users = require('./app_server/routes/users');
//var ctrlMain = require('./app_server/controllers/main');
//var models = require('./app_server/models/db')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//for passport
app.use(require('express-session')(
  {
    secret: 'CITS3403',
    resave: false,
    saveUninitialized: false
  }
));
app.use(passport.initialize());
app.use(passport.session());
//end for passport
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', main);
app.use('/index', index);
//app.use('/users', users);

//passport config
var Account = require('./app_server/models/account');
passport.use(new localStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
require('./app_server/models/db');
module.exports = app;

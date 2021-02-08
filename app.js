var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require("cors");

var mongoose = require('mongoose');

// Change the DB here - and connect to MongoDB Atlas
//mongoose.connect('mongodb://localhost/Flora');
mongoose.connect('mongodb+srv://divyasnbr:72652726sankaran@cluster0.gozo0.mongodb.net/SPORADICFLORA?retryWrites=true&w=majority');
/* 
  Collection name 
  - Plants
  - Users
*/

var indexRouter = require('./routes/index');
var plantsRouter = require('./routes/plants');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/messages');

var app = express();
app.use(cors());

app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/plants', plantsRouter);
app.use('/auth', usersRouter);
app.use('/messages', messagesRouter);

app.use(express.static('public'))

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

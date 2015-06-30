var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var parseurl = require('parseurl');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tiziservice');


var routes = require('./routes/index');
var back = require('./routes/background')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookie: {maxAge:  7 * 24 * 60 * 60 * 1000},
  resave : true,
  saveUninitialized :true,
  store: new MongoStore({
    url: 'mongodb://localhost/sessions'
  }),
  secret: '69S5C8E4FCS5E4FP95Z7DE'
}));
app.use(function (req, res, next) {
  var pathname = parseurl(req).pathname;
  var sess = req.session;
  if (!sess.views) {
    sess.views = 1;
  }else sess.views ++;//设置views>40为异常，拒绝请求；
  //权限控制
  if(pathname !== "/" && pathname !== "/signin" && pathname !== "/signup" && pathname !== "/background" && pathname !== "/background/signin"){
    if(!sess.user && !sess.back){
      console.log('redirect');
      console.log(pathname);
      res.redirect('/');
    }else{
      next();
    }
  }else{
    next();
  }
});


app.use('/', routes);
app.use('/background', back);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

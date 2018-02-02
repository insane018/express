var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var nswbmw = require('./routes/nswbmw');
var login = require('./routes/login');


var app = express();




// view engine setup 
app.set('views', path.join(__dirname, 'views'));    //设置模板路径
app.set('view engine', 'jade');                     // 视图模板引擎设置

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/nswbmw', nswbmw);
app.use('/login', login);

// catch 404 and forward to error handler
// 如果向next()传入除route字符串,Express会认为当前请求有错误的输出，跳过后续其他非错误处理和路由/中间件函数
// next() 和next(err)类似于Promise.resolve 和Promise.reject
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// 在其他app.use() 和路由调用后，最后定义错误处理中间件.
app.use(function(err, req, res, next) {           // 错误处理，特别之处(四个参数)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

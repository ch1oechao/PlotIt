var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayout = require('express3-ejs-layout');

var app = express();

// cross domain
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// mongoBD
var mongoose = require('mongoose');
var config = {
  mongoURI : {
    'development': 'mongodb://localhost/plotit',
    'test': 'mongodb://localhost/admin'
  }
};

var dbUrl = config.mongoURI[app.settings.env];

mongoose.connect(dbUrl);
require('./server/model');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('MongoDB is connected !');
});

// webpack
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js');

var compiler = webpack(webpackDevConfig);

// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {

    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));


// reload
var reload = require('reload');
var http = require('http');
 
var server = http.createServer(app);
reload(server, app);

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/public')));
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'app/public/images', 'favicon.ico')));

//init route
var route = require('./server/route');
route(app);

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

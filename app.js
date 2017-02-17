var express = require('express');
var methodOverride = require('method-override')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var initPassport = require('./passport/init');
require('./app_api/models/db');



var users = require('./app_server/routes/users');
var passport = require('passport');
var connectRoles = require('connect-roles');
var expressSession = require('express-session');
var routes = require('./app_server/routes/index')(passport);
var routesApi = require('./app_api/routes/index');



var app = express();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//passport

app.use(expressSession({ secret: 'minhaChaveSecreta' }));
app.use(passport.initialize());
app.use(passport.session());


// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates

app.use(flash());



// Initialize Passport

initPassport(passport);



//connect.roles

var user = new connectRoles({
    failureHandler: function (req, res, action) {
        // optional function to customise code that runs when 
        // user fails authorisation 
        var accept = req.headers.accept || '';
        res.status(403);
        if (~accept.indexOf('html')) {
            res.render('access-denied', { action: action });
        } else {
            res.send('Access Denied - You don\'t have permission to: ' + action);
        }
    }
});

app.use(user.middleware());



//routes

app.use('/', routes);
app.use('/users', users);
app.use('/api', routesApi);



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

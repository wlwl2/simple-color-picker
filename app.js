var express = require('express')
var path = require('path')
var expressHbs = require('express-handlebars')

// var routes = require('./routes/index')
// var userRoutes = require('./routes/user')

var app = express()

// view engine setup
// start the package with the expressHbs method.
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, 'src/public')))

app.get('/', function (req, res, next) {
  res.render('index')
})

// order does matter:
// app.use('/user', userRoutes)
// app.use('/', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app

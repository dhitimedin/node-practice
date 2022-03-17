var createError     = require('http-errors');
var express         = require('express');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var mongoose        = require('mongoose');
var wiki            = require('./wiki.js');
var indexRouter     = require('./routes/index');
var usersRouter     = require('./routes/users');
var catalogRouter   = require('./routes/catalog');  //Import routes for "catalog" area of site


var app             = express();
const port          = 3000;
var mongoDB         = 'mongodb://mongo:27017/local_library?retryWrites=true';

// view engine setup
//app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Set up mongoose connection
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// add the middleware libraries into the request handling chain
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// add our route-handling code to the request handling chain. 
// The code will define particular routes for the different parts of the site:
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.
app.use('/wiki', wiki);
app.get('/users/:userId/books/:bookId', function (req, res) {
    // Access userId via: req.params.userId
    // Access bookId via: req.params.bookId
    res.send(req.params);
})

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

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
  });

module.exports = app;
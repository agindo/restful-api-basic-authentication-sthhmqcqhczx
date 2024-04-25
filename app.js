var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
var db = require('./db');

passport.use(new Strategy(
  function(username, password, done) {
    db.login(username,password,function(err,user){
      if (err) { return done(err); }
      var id = user.hasOwnProperty('id') ? user.id : 0;
      if(id<=0) return done(null,false)
      return done(null,user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.getprofile(id,function(err,user){
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/profile/:id', 
  passport.authenticate('basic', { session: false}),
  function(req, res, next) {
    db.getprofile(req.params.id,function(err,result){
      if(err) return res.json({
        'error': err
      });
      res.json(result);
    }
  );    
});

module.exports = app;

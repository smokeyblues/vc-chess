// Require modules
require('colors');
var express = require('express'),
    morgan = require('morgan')('dev'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Routes = require('./routes'),
    config = require('./config'),

    passport = require('passport'),
    sessions = require('express-session');

require('./config/passportConfig');

//connect DB
mongoose.connect("mongodb://localhost/vcChess");

// Set up sessions
var sessionMiddleware = sessions({
  secret : config.sessionSecret,
  saveUnitialized : true,
  resave : false
});

var app = express();

app.use(
  morgan,
  bodyParser.urlencoded({extended : true}),
  bodyParser.json(),
  express.static('public'),
  sessionMiddleware,
  passport.initialize(),
  passport.session()
);

app.listen(process.env.PORT || 3000, ()=>{
  console.log('Server running on ${process.env.PORT} || 3000');
})

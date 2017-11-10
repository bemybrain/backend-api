// Dependencies
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var config = require('./config/config')
var passport = require('passport')
var initPassport = require('./passport/init')
var MongoStore = require('connect-mongo')(session)

// MongoDB
mongoose.connect(config.db)

// Express
var app = express()

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Enable CORS Pre-Flight
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Passport
app.use(session({
  secret: config.auth.token.secret,
  saveUninitialized: false,
  resave: false,
  // using store session on MongoDB using express-session + connect
  store: new MongoStore({
    url: config.db,
    collection: 'sessions'
  })
}))
initPassport(passport)
app.use(passport.initialize())
app.use(passport.session())

// Routes
var routes = require('./routes/index')(passport)
var user = require('./routes/user')
var question = require('./routes/question')
var answer = require('./routes/answer')
var tag = require('./routes/tag')
var dashboard = require('./routes/dashboard')
var push = require('./routes/push')

app.use(config.endpoint + '/', routes)
app.use(config.endpoint + '/users', user)
app.use(config.endpoint + '/questions', question)
app.use(config.endpoint + '/answers', answer)
app.use(config.endpoint + '/tags', tag)
app.use(config.endpoint + '/dashboard', dashboard)
app.use(config.endpoint + '/push', push)

// Start server
app.listen(config.port, function () {
  console.log(process.env.NODE_ENV + ', Listening on server port ' + config.port)
})

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
var cors = require('cors')

// MongoDB
mongoose.connect(config.db)

// Express
var app = express()
// var whitelist = ['http://localhost:9000', 'http://192.168.43.192:9000']; // Acceptable domain names. ie: https://www.example.com
var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    // var originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(null, true)
  }
}

// Enable CORS
app.use(cors(corsOptions))
// Enable CORS Pre-Flight
app.options('*', cors(corsOptions))
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

app.use(config.endpoint + '/', routes)
app.use(config.endpoint + '/users', user)
app.use(config.endpoint + '/questions', question)
app.use(config.endpoint + '/answers', answer)
app.use(config.endpoint + '/tags', tag)
app.use(config.endpoint + '/dashboard', dashboard)

// Start server
app.listen(config.port, config.server_ip_address, function () {
  console.log('Listening on ' + config.server_ip_address + ', server_port ' + config.port)
  console.log(process.env.NODE_ENV)
})

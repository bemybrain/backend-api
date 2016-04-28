// Dependencies
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var config = require('./config')
var passport = require('passport')

// MongoDB
var port = process.env.PORT || 3000
mongoose.connect(config.database)

// Express
var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Passport
require('./passport')(passport)
app.use(session({ secret: config.secret }))
app.use(passport.initialize())
app.use(passport.session())

// Routes
var routes = require('./routes/index')
var user = require('./routes/user')
var question = require('./routes/question')
app.use(config.endpoint + '/', routes)
app.use(config.endpoint + '/users', user)
app.use(config.endpoint + '/questions', question)

// Start server
app.listen(port)
console.log('API is running on port ' + port)

// Dependencies
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var config = require('./config')
var passport = require('passport')

// MongoDB
var port = process.env.PORT || 3000
mongoose.connect(config.database)

// Express
var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Passport
app.use(passport.initialize())

// Routes
app.use('/api', require('./routes/api'))

// Start server
app.listen(port)
console.log('API is running on port ' + port)

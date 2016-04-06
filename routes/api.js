// Dependencies
var express = require('express')
var router = express.Router()

// Models
var User = require('../models/user')
var Question = require('../models/question')
var Answer = require('../models/answer')
var Tag = require('../models/tag')
var Notification = require('../models/notification')

// Routes
User.methods(['get', 'put', 'post', 'delete'])
User.register(router, '/users')

Question.methods(['get', 'put', 'post', 'delete'])
Question.register(router, '/questions')

Answer.methods(['get', 'put', 'post', 'delete'])
Answer.register(router, '/answers')

Tag.methods(['get', 'put', 'post', 'delete'])
Tag.register(router, '/tags')

Notification.methods(['get', 'put', 'post', 'delete'])
Notification.register(router, '/notifications')

// Return router
module.exports = router

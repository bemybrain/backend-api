// Dependencies
var express = require('express')
var router = express.Router()
var bcrypt = require('bcrypt')

// Models
var User = require('../models/user')
var Question = require('../models/question')
var Answer = require('../models/answer')
var Tag = require('../models/tag')
var Notification = require('../models/notification')

// Controllers
var hashPassword = function (req, res, next) {
  if (!req.body.password) {
    return next({ status: 400, err: 'No password!' })
  }
  req.body.password = bcrypt.hashSync(req.body.password, 10)
  return next()
}

var comparePassword = function (req, res, next) {
  if (!req.body.password) {
    return next({ status: 400, err: 'No password!' })
  }
  bcrypt.compare(req.body.password, 10, function (err, res) {
    if (err) {
      return next(err)
    } else {
      return next(res)
    }
  })
}

// Routes
User.methods(['get', 'put', 'delete', {
  method: 'post',
  before: hashPassword
}])
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

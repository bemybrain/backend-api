var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('./user')

// Index
router.get('/', function (req, res, next) {
  console.log('Index!')
})

// Sign up
router.post('/signup', function (req, res) {
  User.addUser(req.body, null, function (user) {
    req.login(user, function (err) {
      if (err) { return next(err) }
      return res.redirect('/users/' + req.user.username)
    })
  })
})

// Login
router.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(res.user)
})

// Logout
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router

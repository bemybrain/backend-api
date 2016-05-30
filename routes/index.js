var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('./user')

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated()) return next()
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/')
}

module.exports = function (passport) {
  /* GET login page. */
  router.get('/', function (req, res) {
    console.log('home!')
  })

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  }))

  /* Handle Logout */
  router.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  return router
}

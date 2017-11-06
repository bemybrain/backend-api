var express = require('express')
var router = express.Router()
var passport = require('passport')
var config = require('../config/config')

module.exports = function (passport) {
  /* GET login page. */
  router.get('/', function (req, res) {
    console.log('home!')
  })

  /* Handle Login POST */
  router.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated())
  })

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login'), function (req, res, next) {
    req.session.save(function (err) {
      if (err) {
        console.log(err);
        return next(err)
      }
      res.send(req.user)
    })
  })

  /* Handle Facebook Login POST */
  router.post('/fblogin', passport.authenticate('fblogin'), function (req, res, next) {
    req.session.save(function (err) {
      if (err) {
        console.log(err);
        return next(err)
      }
      res.send(req.user)
    })
  })

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup'), function (req, res, next) {
    req.session.save(function (err) {
      if (err) {
        return next(err)
      }
      if (req.user) {
        res.send(req.user)
      } else {
        res.sendStatus(401)
      }
    })
  })

  /* Handle Logout */
  router.get('/logout', function (req, res) {
    req.logout()
    res.sendStatus(200)
  })

  return router
}

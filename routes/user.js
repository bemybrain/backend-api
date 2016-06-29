var express = require('express')
var router = express.Router()
var bcrypt = require('bcrypt')
var User = require('../models/user')

// GET /users
var getUsers = function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      res.send(users)
    }
  })
}

// GET /users/:id
var getUserById = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      res.send(user)
    }
  })
}

// PUT /users/:id
var updateUser = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    console.log(user)
    if (err) {
      console.log('Error: ' + err)
    } else {
      user.name = req.body.name
      user.email = req.body.email
      user.username = req.body.username
      user.interests = req.body.interests
      // user.picture = req.body.picture
      user.save(function (err) {
        if (err) {
          console.log('Error: ' + err)
        } else {
          res.send(user)
        }
      })
    }
  })
}

// DELETE /users/:id
var deleteUser = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      user.remove(function (err) {
        if (err) {
          console.log('Error: ' + err)
        }
      })
    }
  })
}

var auth = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.sendStatus(401)
  }
}

router.get('/', getUsers)
router.get('/:id', getUserById)
router.put('/:id', auth, updateUser)
router.delete('/:id', deleteUser)

module.exports = router

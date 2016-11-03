var _ = require('lodash')
var express = require('express')
var router = express.Router()
var User = require('../models/user')
var Tags = require('../models/tag')

// GET /users
var getUsers = function (req, res) {
  User
  .find()
  .populate(['tags'])
  .exec(function (err, users) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      res.send(users)
    }
  })
}

// GET /users/:id
var getUserById = function (req, res) {
  User
  .findById(req.params.id)
  .populate(['tags'])
  .exec(function (err, user) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      res.send(user)
    }
  })
}

// PUT /users/:id
var updateUser = function (req, res) {
  editUser(req.params.id, req.body, function (err, user) {
    if (err) {
      console.log('Error: ' + err)
      res.send(err)
    } else {
      res.send(user)
    }
  })
}

// DELETE /users/:id
var deleteUser = function (req, res) {
  User
  .findById(req.params.id)
  .exec(function (err, user) {
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

function updateUserTags (user, newTags, callback) {
  Tags.find(function (err, tags) {
    if (err) return callback(err)
    var tagIds = _.map(tags, function (t) { return String(t._id) })
    newTags = _.intersection(tagIds, newTags)
    user.tags = newTags
    callback(user)
  })
}

function editUser (userId, attr, callback) {
  function save (u) {
    u.save(function (err) {
      callback(err || null, u)
    })
  }
  User
  .findById(userId)
  .exec(function (err, user) {
    if (err) return callback(err, user || null)
    if (attr.name) user.name = attr.name
    if (attr.email) user.email = attr.email
    if (attr.username) user.username = attr.username
    if (attr.picture) user.picture = attr.picture
    if (attr.admin === true || attr.admin === false) user.admin = attr.admin
    if (attr.tags) {
      updateUserTags(user, attr.tags, save)
    } else {
      save(user)
    }
  })
}

router.get('/', getUsers)
router.get('/:id', getUserById)
router.put('/:id', auth, updateUser)
router.delete('/:id', auth, deleteUser)

module.exports = router

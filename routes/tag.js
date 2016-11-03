var express = require('express')
var router = express.Router()
var Tag = require('../models/tag')

// GET /tags
var getTags = function (req, res) {
  Tag
  .find(req.query)
  .populate('related')
  .exec(function (err, tags) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      res.send(tags)
    }
  })
}

// GET /tags/:id
var getTagById = function (req, res) {
  Tag
  .findById(req.params.id)
  .populate('related')
  .exec(function (err, tag) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      res.send(tag)
    }
  })
}

// POST /tags
var addTag = function (req, res) {
  var newTag = new Tag(req.body)
  newTag.save(function (err) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      res.send(newTag)
    }
  })
}

// PUT /tags/:id
var updateTag = function (req, res) {
  Tag.findById(req.params.id, function (err, tag) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      tag.name = req.body.name
      tag.related = req.body.related
      tag.save(function (err) {
        if (err) {
          console.log('Error: ' + err)
        } else {
          res.send(tag)
        }
      })
    }
  })
}

// DELETE /tags/:id
var deleteTag = function (req, res) {
  Tag.findById(req.params.id, function (err, tag) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      tag.remove(function (err) {
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
    res.send(401)
  }
}

router.get('/', getTags)
router.get('/:id', getTagById)
router.post('/', auth, addTag)
router.put('/:id', auth, updateTag)
router.delete('/:id', auth, deleteTag)

module.exports = router

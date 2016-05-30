var express = require('express')
var router = express.Router()
var Tag = require('../models/tag')

// GET /tags
var getTags = function (req, res) {
  Tag.find(function (err, tags) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      res.send(tags)
    }
  })
}

// GET /tags/:id
var getTagById = function (req, res) {
  Tag.findById(req.params.id, function (err, tag) {
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

router.get('/', getTags)
router.get('/:id', getTagById)
router.post('/', addTag)
router.put('/:id', updateTag)
router.delete('/:id', deleteTag)

module.exports = router

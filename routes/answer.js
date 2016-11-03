var express = require('express')
var router = express.Router()
var Answer = require('../models/answer')
var passport = require('passport')
var mongoose = require('mongoose')

// GET /answers
var getAnswers = function (req, res) {
  Answer
    .find(req.query)
    .populate('author', '-password')
    .exec(function (err, answers) {
      if (err) {
        console.log('Error: ' + err)
      } else {
        res.send(answers)
      }
    })
}

// GET /answers/:id
var getAnswerById = function (req, res) {
  Answer.findById(req.params.id, function (err, answer) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      res.send(answer)
    }
  })
}

// POST /answers
var addAnswer = function (req, res) {
  var newAnswer = new Answer()
  newAnswer.body = req.body.body
  newAnswer.author = mongoose.Types.ObjectId(req.body.author)
  newAnswer.question = mongoose.Types.ObjectId(req.body.question)
  newAnswer.save(function (err) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      res.send(newAnswer)
    }
  })
}

// PUT /answers/:id
var updateAnswer = function (req, res) {
  Answer.findById(req.params.id, function (err, answer) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      body = req.body.body
      author = req.body.author
      upvotes = req.body.upvotes
      downvotes = req.body.downvotes
      date = req.body.date
      score = req.body.score
      answer.save(function (err) {
        if (err) {
          console.log('Error: ' + err)
        } else {
          res.send(answer)
        }
      })
    }
  })
}

// DELETE /answers/:id
var deleteAnswer = function (req, res) {
  Answer.findById(req.params.id, function (err, answer) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      answer.remove(function (err) {
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

router.get('/', getAnswers)
router.get('/:id', getAnswerById)
router.post('/', auth, addAnswer)
router.put('/:id', auth, updateAnswer)
router.delete('/:id', auth, deleteAnswer)

module.exports = router

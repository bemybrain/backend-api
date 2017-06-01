var express = require('express')
var router = express.Router()
var Answer = require('../models/answer')
var passport = require('passport')
var mongoose = require('mongoose')

var auth = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.sendStatus(401)
  }
}

// GET /answers
var getAnswers = function (req, res) {
  Answer
    .find(req.query)
    .sort({ 'score': 'desc', 'date': 'desc' })
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
      answer.body = req.body.body
      answer.author = req.body.author
      answer.date = req.body.date
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

// PUT /answers/:id/upvote
var upvote = function (req, res) {
  Answer.findById(req.params.id, function (err, answer) {
    if (err) {
      console.log('Error: ' + err)
      res.send(err)
    } else {
      var userId = req.user._id
      var upvotesIndex = answer.upvotes.indexOf(userId)
      var downvotesIndex = answer.downvotes.indexOf(userId)
      var hasUpvoted = upvotesIndex !== -1
      var hasDownvoted = downvotesIndex !== -1
      if (hasUpvoted) {
        answer.upvotes.splice(upvotesIndex, 1)
      } else {
        if (hasDownvoted) {
          answer.downvotes.splice(downvotesIndex, 1)
        }
        answer.upvotes.push(userId)
      }
      answer.score = answer.upvotes.length - answer.downvotes.length
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

// PUT /answers/:id/downvote
var downvote = function (req, res) {
  Answer.findById(req.params.id, function (err, answer) {
    if (err) {
      console.log('Error: ' + err)
      res.send(err)
    } else {
      var userId = req.user._id
      var upvotesIndex = answer.upvotes.indexOf(userId)
      var downvotesIndex = answer.downvotes.indexOf(userId)
      var hasUpvoted = upvotesIndex !== -1
      var hasDownvoted = downvotesIndex !== -1
      if (hasDownvoted) {
        answer.downvotes.splice(downvotesIndex, 1)
      } else {
        if (hasUpvoted) {
          answer.upvotes.splice(upvotesIndex, 1)
        }
        answer.downvotes.push(userId)
      }
      answer.score = answer.upvotes.length - answer.downvotes.length
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

router.get('/', getAnswers)
router.get('/:id', getAnswerById)
router.post('/', auth, addAnswer)
router.put('/:id', auth, updateAnswer)
router.put('/:id/upvote', auth, upvote)
router.put('/:id/downvote', auth, downvote)
router.delete('/:id', auth, deleteAnswer)

module.exports = router

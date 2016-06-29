var express = require('express')
var router = express.Router()
var Question = require('../models/question')

// GET /questions
var getQuestions = function (req, res) {
  Question
    .find(req.query)
    .populate(['author'])
    .exec(function (err, questions) {
      if (err) {
        console.log('Error: ' + err)
      } else {
        res.send(questions)
      }
    })
}

// GET /questions/:id
var getQuestionById = function (req, res) {
  Question
    .findById(req.params.id)
    .populate(['author'])
    .exec(function (err, question) {
      if (err) {
        console.log('Error: ' + err)
      } else {
        res.send(question)
      }
    })
}

// POST /questions
var addQuestion = function (req, res) {
  var newQuestion = new Question()
  newQuestion.title = req.body.title
  newQuestion.body = req.body.body
  newQuestion.author = req.body.author
  newQuestion.tags = req.body.tags
  newQuestion.save(function (err) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      res.send(newQuestion)
    }
  })
}

// PUT /questions/:id
var updateQuestion = function (req, res) {
  Question.findById(req.params.id, function (err, question) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      question.title = req.body.title
      question.body = req.body.body
      question.tags = req.body.tags
      question.status = req.body.status
      question.save(function (err) {
        if (err) {
          console.log('Error: ' + err)
        } else {
          res.send(question)
        }
      })
    }
  })
}

// DELETE /questions/:id
var deleteQuestion = function (req, res) {
  Question.findById(req.params.id, function (err, question) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      question.remove(function (err) {
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

router.get('/', getQuestions)
router.get('/:id', getQuestionById)
router.post('/', auth, addQuestion)
router.put('/:id', auth, updateQuestion)
router.delete('/:id', auth, deleteQuestion)

module.exports = router

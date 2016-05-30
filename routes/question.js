var express = require('express')
var router = express.Router()
var Question = require('../models/question')

// GET /questions
var getQuestions = function (req, res) {
  Question.find(function (err, questions) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      res.send(questions)
    }
  })
}

// GET /questions/:id
var getQuestionById = function (req, res) {
  Question.findById(req.params.id, function (err, question) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      res.send(question)
    }
  })
}

// POST /questions
var addQuestion = function (req, res) {
  var newQuestion = new Question(req.body)
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

router.get('/', getQuestions)
router.get('/:id', getQuestionById)
router.post('/', addQuestion)
router.put('/:id', updateQuestion)
router.delete('/:id', deleteQuestion)

module.exports = router

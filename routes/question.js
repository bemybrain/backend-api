var _ = require('lodash');
var express = require('express')
var router = express.Router()
var Question = require('../models/question')
var Tags = require('../models/tag')
var Notifications = require('../notifications')

// GET /questions
var getQuestions = function (req, res) {
  var query = req.query
  if (!query.status) {
    query.status = 'open'
  }
  Question
    .find(query)
    .populate(['author', 'tags'])
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
    .populate(['author', 'tags'])
    .exec(function (err, question) {
      if (err) {
        console.log('Error: ' + err)
      } else {
        Notifications.questionCreated(question)
        res.send(question)
      }
    })
}

// POST /questions
var addQuestion = function (req, res) {
  function save (q) {
    q.save(function (err) {
      callback(err || null, q)
    })
  }
  var newQuestion = new Question()
  newQuestion.title = req.body.title
  newQuestion.body = req.body.body
  newQuestion.author = req.body.author
  newQuestion.save(function (err) {
    if (err) {
      console.log('Error: ' + err)
      res.send(err)
    } else {
      if (req.body.tags && req.body.tags.length) {
        updateQuestionTags(newQuestion, req.body.tags, function (question) {
          question.save(function (err) {
            Notifications.questionCreated()
            res.send(err ? err : newQuestion)
          })
        })
      } else {
        res.send(newQuestion)
      }
    }
  })
}

// PUT /questions/:id
var updateQuestion = function (req, res) {
  editQuestion(req.params.id, req.body, function (err, question) {
    if (err) {
      console.log('Error: ' + err)
      res.send(err)
    } else {
      question.populate(['author', 'tags'], function (err) {
        res.send(question)
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
      question.status = 'deleted'
      question.save(function (err) {
        if (err) {
          console.log('Error: ' + err)
          res.send(err)
        } else {
          res.send(question)
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

function updateQuestionTags (question, newTags, callback) {
  Tags.find(function (err, tags) {
    if (err) return callback(err)
    var tagIds = _.map(tags, function (t) { return String(t._id) })
    newTags = _.intersection(tagIds, newTags)
    question.tags = newTags
    console.log(question.tags);
    callback(question)
  })
}

function editQuestion (questionId, attr, callback) {
  function save (q) {
    q.save(function (err) {
      callback(err || null, q)
    })
  }
  Question.findById(questionId, function (err, question) {
    if (err) return callback(err, question || null)
    if (attr.title) question.title = attr.title
    if (attr.body) question.body = attr.body
    if (attr.date) question.date = attr.date
    if (attr.status) question.status = attr.status
    if (attr.author) question.author = attr.author
    if (attr.tags) {
      updateQuestionTags(question, attr.tags, save)
    } else {
      save(question)
    }
  })
}

router.get('/', getQuestions)
router.get('/:id', getQuestionById)
router.post('/', auth, addQuestion)
router.put('/:id', auth, updateQuestion)
router.delete('/:id', auth, deleteQuestion)

module.exports = router

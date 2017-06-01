var _ = require('lodash');
var express = require('express')
var router = express.Router()
var Question = require('../models/question')
var Tags = require('../models/tag')
var Notifications = require('../notifications')

// GET /questions
var getQuestions = function (req, res) {
  var query = req.query
  var limit = query.limit ? eval(query.limit) : 10
  var skip = query.skip ? eval(query.skip) : 0
  var filter = {
    status: query.status || 'open',
  }
  if (query.author) filter.author = query.author
  Question
    .find(filter)
    .sort('-date')
    .skip(skip)
    .limit(limit)
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
      editQuestion(newQuestion._id, req.body, cb)
    }
  })

  function cb (err, question) {
    if (err) {
      console.log('Error: ' + err)
      res.send(err)
    } else {
      question.populate(['author', 'tags'], function (err) {
        Notifications.questionCreated(question)
        res.send(question)
      })
    }
  }
}

// PUT /questions/:id
var updateQuestion = function (req, res) {
  editQuestion(req.params.id, req.body, function (err, question) {
    if (err) {
      console.log('Error: ' + err)
      res.send(err)
    } else {
      question.populate(['author', 'tags'], function (err) {
        Notifications.questionCreated(question)
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
  console.log(questionId);
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

// PUT /questions/:id/upvote
var upvote = function (req, res) {
  Question.findById(req.params.id, function (err, question) {
    if (err) {
      console.log('Error: ' + err)
      res.send(err)
    } else {
      const userId = req.user._id
      const upvotesIndex = question.upvotes.indexOf(userId)
      const downvotesIndex = question.downvotes.indexOf(userId)
      let hasUpvoted = upvotesIndex !== -1
      let hasDownvoted = downvotesIndex !== -1
      if (hasUpvoted) {
        question.upvotes.splice(upvotesIndex, 1)
      } else {
        if (hasDownvoted) {
          question.downvotes.splice(downvotesIndex, 1)
        }
        question.upvotes.push(userId)
      }
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

// PUT /questions/:id/downvote
var downvote = function (req, res) {
  Question.findById(req.params.id, function (err, question) {
    if (err) {
      console.log('Error: ' + err)
      res.send(err)
    } else {
      const userId = req.user._id
      const upvotesIndex = question.upvotes.indexOf(userId)
      const downvotesIndex = question.downvotes.indexOf(userId)
      let hasUpvoted = upvotesIndex !== -1
      let hasDownvoted = downvotesIndex !== -1
      if (hasDownvoted) {
        question.downvotes.splice(downvotesIndex, 1)
      } else {
        if (hasUpvoted) {
          question.upvotes.splice(upvotesIndex, 1)
        }
        question.downvotes.push(userId)
      }
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

router.get('/', getQuestions)
router.get('/:id', getQuestionById)
router.post('/', auth, addQuestion)
router.put('/:id', auth, updateQuestion)
router.put('/:id/upvote', auth, upvote)
router.put('/:id/downvote', auth, downvote)
router.delete('/:id', auth, deleteQuestion)

module.exports = router

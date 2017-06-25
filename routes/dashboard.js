var _ = require('lodash');
var express = require('express')
var router = express.Router()
var Question = require('../models/question')
var Tags = require('../models/tag')
var Answer = require('../models/answer')
var User = require('../models/user')
var rankRules = [
  { type: 'newbie', q: 0, a: 0, s: 0 },
  { type: 'researcher', q: 1, a: 1, s: 0 },
  { type: 'collaborator', q: 3, a: 5, s: 0 },
  { type: 'professor', q: 3, a: 15, s: 5 },
  { type: 'specialist', q: 3, a: 30, s: 15 }
]

var auth = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.sendStatus(401)
  }
}

var getRules = function (req, res) {
  res.send(rankRules)
}

var getUserAnswers = function (userId, callback) {
  Answer
    .find({
      author: userId
    })
    .sort({ 'score': 'desc', 'date': 'desc' })
    .populate('question')
    .exec(callback)
}

var getUserQuestions = function (userId, callback) {
  Question
    .find({
      author: userId,
      status: 'open'
    })
    .sort({ 'score': 'desc', 'date': 'desc' })
    .exec(callback)
}

var getUserScore = function (answers) {
  return _.reduce(answers, function (sum, answer) {
    return sum + answer.score
  }, 0)
}

var getUserRank = function (q, a, s) {
  return _.findLastIndex(rankRules, function (rule) {
    return q >= rule.q &&
           a >= rule.a &&
           s >= rule.s
  })
}

var setUserRank = function (userId, rank) {
  User
  .findById(userId)
  .exec(function (err, user) {
    user.rank = rank
    user.save()
  })
}

var getUpvotesCount = function (answers) {
  return _.reduce(answers, function (sum, answer) {
    return sum + answer.upvotes.length
  }, 0)
}

var getDownvotesCount = function (answers) {
  return _.reduce(answers, function (sum, answer) {
    return sum + answer.downvotes.length
  }, 0)
}

var getTagsCount = function (answers) {
  var tagList = []
  var output = {}
  _.forEach(answers, function (answer) {
    if (answer.question && answer.question.tags.length) {
      tagList = _.concat(tagList, answer.question.tags)
    }
  })
  _.forEach(tagList, function (tag) {
    if (output[tag]) {
      output[tag] = output[tag] + 1
    } else {
      output[tag] = 1
    }
  })
  return output
}

// GET /dashboard/:id
var getDashboard = function (req, res) {
  var userId = req.params.userId
  getUserQuestions(userId, function (err, questions) {
    if (err) {
      console.log(err)
      return res.send(err)
    }
    getUserAnswers(userId, function (err, answers) {
      if (err) {
        console.log(err)
        return res.send(err)
      }
      var questionsCount = questions.length
      var answersCount = answers.length
      var upvotesCount = getUpvotesCount(answers)
      var downvotesCount = getDownvotesCount(answers)
      var userScore = getUserScore(answers)
      var userRank = getUserRank(questionsCount, answersCount, userScore)
      var output = {
        upvotes: upvotesCount,
        downvotes: downvotesCount,
        score: userScore,
        questions: questionsCount,
        answers: answersCount,
        tags: getTagsCount(answers),
        rank: userRank,
        rules: rankRules
      }
      res.send(output)
      setUserRank(userId, userRank)
    })
  })
}

router.get('/rules', getRules)
router.get('/:userId', auth, getDashboard)

module.exports = router

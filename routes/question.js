module.exports = function (app) {
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
  var getQuestionsById = function (req, res) {
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

  app.get('/questions', getQuestions)
  app.get('/questions/:id', getQuestionsById)
  app.post('/questions', addQuestion)
  app.put('/questions/:id', updateQuestion)
  app.delete('/questions/:id', deleteQuestion)
}

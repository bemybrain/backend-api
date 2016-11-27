var _ = require('lodash');
var path = require('path')
var mailer = require('./mailer')
var User = require('../models/user')
var templatesDir = path.resolve(__dirname, '..', 'templates')
var EmailTemplate = require('email-templates').EmailTemplate

var questionCreated = function (question) {
	var tags = question.tags
	var tagIds = _.map(tags, function (t) { return String(t._id) })
	User
	.find({ 'tags' : { $in : tagIds } })
	.exec(function (err, _users) {
		if (err) {
			console.log('Error: ' + err)
		} else {
			var template = new EmailTemplate(path.join(templatesDir, 'question-created'))
			var templateData = {
				data: {
					question: question
				}
			}
			template.render(templateData, function (err, result) {
				if (err) {
					return console.log(err)
				} else {
					var props = {
						subject: 'Temos uma pergunta do seu interesse ✔',
						text: question.title,
						body: result.html
					}
					var userMails = _.filter(_users, function (user) {
						return String(question.author._id) !== String(user._id)
					})
					userMails = _.map(userMails, 'email')
					mailer.send(userMails.toString(), props)
				}
			})
		}
	})
} 

module.exports = {
	questionCreated: questionCreated
}


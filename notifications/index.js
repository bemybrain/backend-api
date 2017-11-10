var _ = require('lodash');
var mailer = require('./mailer')
var push = require('./push')
var User = require('../models/user')

var questionCreated = function (question) {
	var tags = question.tags
	var tagIds = _.map(tags, function (t) { return String(t._id) })
	User
		.find({ 'tags' : { $in : tagIds } })
		.exec(function (err, _users) {
			if (err) {
				console.log('Error: ' + err)
			} else {
				var userIds = _.map(_users, function (u) { return String(u._id) })
				// mailer.build(question, _users)
				push.build('question_created', userIds, question)
			}
		})
}

module.exports = {
	questionCreated: questionCreated
}


var _ = require('lodash');
var express = require('express')
var mailer = require('./mailer')
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
			var props = {
				subject: 'Temos uma pergunta do seu interesse ✔',
				text: question.title,
				body: question.body
			}
			var userMails = _.filter(_users, function (user) {
				return String(question.author._id) !== String(user._id)
			})
			userMails = _.map(userMails, 'email')
			mailer.send(userMails.toString(), props)
		}
	})
} 

module.exports = {
	questionCreated: questionCreated
}


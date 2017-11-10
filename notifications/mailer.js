var _ = require('lodash')
var path = require('path')
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')
var templatesDir = path.resolve(__dirname, '..', 'templates')
var EmailTemplate = require('email-templates').EmailTemplate

var send = function (emails, props) {
	var userMails = _.map(emails, 'email')
	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport(smtpTransport({
		service: 'gmail',
		auth: {
			user: 'bmybrain@gmail.com',
			pass: 'bmb102030'
		}
	}))
	// setup e-mail data with unicode symbols
	var mailOptions = {
    from: '"Be My Brain Team 👓" <bmybrain@gmail.com>', // sender address
    to: emails, // list of receivers
    subject: props.subject, // Subject line
    text: props.text, // plaintext body
    html: props.body // html body
  }

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			return console.log(error)
		}
		console.log('Message sent: ' + info.response)
	})
}

var build = function (question, users) {
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
			var userMails = _.filter(users, function (user) {
				return String(question.author._id) !== String(user._id)
			})
			userMails = _.map(userMails, 'email')
			console.log(userMails)
			if (userMails.length) {
				send(userMails.toString(), props)
			}
		}
	})
}

module.exports = {
	send: send,
	build: build
}
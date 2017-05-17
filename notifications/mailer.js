var _ = require('lodash');
var express = require('express')
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')

var send = function (emails, props) {
	var userMails = _.map(emails, 'email')
	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport(smtpTransport({
		service: 'gmail',
		auth: {
			user: 'bmybrain@gmail.com',
			pass: 'bmb102030'
		}
	}));
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
		console.log('Message sent: ' + info.response);
	})
}

module.exports = {
	send: send
}
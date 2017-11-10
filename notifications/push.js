var webpush = require('web-push')
var PushModel = require('../models/push')

var send = function (subscription, data) {
  return webpush
    .sendNotification(subscription, data)
    .catch((err) => {
      if (err.statusCode === 410) {
        console.log(410)
        // return deleteSubscriptionFromDatabase(subscription._id)
      } else {
        console.log('Subscription is no longer valid: ', err)
      }
    })
}

var build = function (type, userIds, payload) {
  PushModel
    .find({ 'user' : { $in : userIds } })
    .exec(function (err, subscriptions) {
      if (err) {
        console.log('Error: ' + err)
      } else {
        subscriptions.forEach(function (s) {
          var data =  {
            type: type,
            payload: payload
          }
          send(JSON.parse(s.subscription), JSON.stringify(data))
        })
      }
    })
}

module.exports = {
  send: send,
	build: build
}
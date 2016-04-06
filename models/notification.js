// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose

// Schema
var notificationSchema = new mongoose.Schema({
  type: String,
  body: String,
  from: { type: 'ObjectId', ref: 'User', require: true },
  to: { type: 'ObjectId', ref: 'User', require: true },
  status: String
})

// Return model
module.exports = restful.model('Notification', notificationSchema)

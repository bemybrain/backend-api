// Dependencies
var restful = require('node-restful')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema
var notificationSchema = new Schema({
  type: String,
  body: String,
  from: { type: 'ObjectId', ref: 'User', require: true },
  to: { type: 'ObjectId', ref: 'User', require: true },
  status: String
})

// Return model
module.exports = mongoose.model('Notification', notificationSchema)

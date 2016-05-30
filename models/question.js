// Dependencies
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema
var questionSchema = new Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now },
  tags: [ { type: 'ObjectId', ref: 'Tag', require: true, index: true } ],
  status: { type: String, default: 'open' },
  author: { type: 'ObjectId', ref: 'User', require: true }
})

// Return model
module.exports = mongoose.model('Question', questionSchema)

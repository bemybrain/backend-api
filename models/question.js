// Dependencies
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema
var questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'open' },
  tags: [ { type: 'ObjectId', ref: 'Tag' } ],
  author: { type: 'ObjectId', ref: 'User', require: true }
})

// Return model
module.exports = mongoose.model('Question', questionSchema)

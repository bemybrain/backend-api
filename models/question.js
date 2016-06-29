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
  tags: [String],
  status: { type: String, default: 'open' },
  author: { type: 'ObjectId', ref: 'User', require: true },
  answers: [ { type: 'ObjectId', ref: 'Questions' } ]
})

// Return model
module.exports = mongoose.model('Question', questionSchema)

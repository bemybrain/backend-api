// Dependencies
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema
var answerSchema = new Schema({
  body: String,
  author: { type: 'ObjectId', ref: 'User', required: true },
  question: { type: 'ObjectId', ref: 'Question', required: true },
  upvotes: Number,
  downvotes: Number,
  date: { type: Date, default: Date.now },
  score: Number
})

// Return model
module.exports = mongoose.model('Answer', answerSchema)

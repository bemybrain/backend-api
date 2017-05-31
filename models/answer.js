// Dependencies
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema
var answerSchema = new Schema({
  body: String,
  author: { type: 'ObjectId', ref: 'User', required: true },
  question: { type: 'ObjectId', ref: 'Question', required: true },
  date: { type: Date, default: Date.now },
  upvotes: [ { type: 'ObjectId', ref: 'User' } ],
  downvotes: [ { type: 'ObjectId', ref: 'User' } ]
})

// Return model
module.exports = mongoose.model('Answer', answerSchema)

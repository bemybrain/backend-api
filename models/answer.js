// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose

// Schema
var answerSchema = new mongoose.Schema({
  body: String,
  author: { type: 'ObjectId', ref: 'User', require: true },
  upvotes: Number,
  downvotes: Number,
  date: { type: Date, default: Date.now },
  score: Number
})

// Return model
module.exports = restful.model('Answer', answerSchema)

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
  author: { type: 'ObjectId', ref: 'User', require: true },
  tags: [ { type: 'ObjectId', ref: 'Tag' } ],
  upvotes: [ { type: 'ObjectId', ref: 'User' } ],
  downvotes: [ { type: 'ObjectId', ref: 'User' } ],
  score: { type: Number, default: 0 }
})

// Return model
module.exports = mongoose.model('Question', questionSchema)

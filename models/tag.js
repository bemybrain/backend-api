// Dependencies
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema
var tagSchema = new Schema({
  name: String,
  related: [ { type: 'ObjectId', ref: 'Tag', require: false, index: true } ]
})

// Return model
module.exports = mongoose.model('Tag', tagSchema)

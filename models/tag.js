// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose

// Schema
var tagSchema = new mongoose.Schema({
  name: String,
  related: [ { type: 'ObjectId', ref: 'Tag', require: false, index: true } ]
})

// Return model
module.exports = restful.model('Tag', tagSchema)

// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose

// Schema
var userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  username: String,
  interests: [ { type: 'ObjectId', ref: 'Tag', require: false, index: true } ],
  picture: String,
  rule: String
})

// Return model
module.exports = restful.model('User', userSchema)

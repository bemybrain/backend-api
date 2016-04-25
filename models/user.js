// Dependencies
var restful = require('node-restful')
var mongoose = restful.mongoose

// Schema
var userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  interests: [ { type: 'ObjectId', ref: 'Tag', require: false, index: true } ],
  picture: String,
  admin: Boolean
})

// Return model
module.exports = restful.model('User', userSchema)

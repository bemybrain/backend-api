// Dependencies
var restful = require('node-restful')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Schema
var userSchema = new Schema({
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
module.exports = mongoose.model('User', userSchema)

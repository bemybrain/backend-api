var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')
var passport = require('passport')
var passportLocalMongoose = require('passport-local-mongoose')

// Schema
var pushSchema = new Schema({
  user: { type: 'ObjectId', ref: 'User' },
  subscription: {
    type: String,
    unique: true,
    required: true
  }
})

// Return model
module.exports = mongoose.model('Push', pushSchema)
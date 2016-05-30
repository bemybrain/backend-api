// Dependencies
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')

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
  admin: {
    type: Boolean,
    default: false
  }
})

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

// Return model
module.exports = mongoose.model('User', userSchema)

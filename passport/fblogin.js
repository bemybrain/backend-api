var CustomStrategy = require('passport-custom')
var User = require('../models/user')

module.exports = function (passport) {
  passport.use('fblogin', new CustomStrategy(function (req, done) {
    // check in mongo if a user with username exists or not
    var email = req.body.email
    User
      .findOne({ 'email': email })
      .populate(['tags'])
      .exec(function (err, user) {
        // In case of any error, return using the done method
        if (err) return done(err)
        // Username does not exist, log the error and redirect back
        if (!user) {
          console.log('User Not Found with email ' + email)
          return done(null, false)
        }
        // wrong email validation
        if (user.email !== email) {
          console.log('email not match')
          return done(null, false)
        }
        // email match, return user from done method
        // which will be treated like success
        return done(null, user)
      })
  }))
}

var CustomStrategy = require('passport-custom')
var User = require('../models/user')

module.exports = function (passport) {
  passport.use('fblogin', new CustomStrategy(function (req, done) {
    // check in mongo if a user with username exists or not
    var fbId = req.body.fbId
    var userId = req.body.userId

    if (userId) {
      setFbId(userId, fbId, sendUser)
    } else {
      sendUser()
    }
    
    function sendUser () {
      User
      .findOne({ 'fbId': fbId })
      .populate(['tags'])
      .exec(function (err, user) {
        // In case of any error, return using the done method
        if (err) return done(err)
        // Username does not exist, log the error and redirect back
        if (!user) {
          console.log('User Not Found with fbId ' + fbId)
          return done(null, false)
        }
        // wrong fbId validation
        if (user.fbId !== fbId) {
          console.log('fbId not match')
          return done(null, false)
        }
        // fbId match, return user from done method
        // which will be treated like success
        return done(null, user)
      })
    }
  }))
}

function setFbId (userId, fbId, callback) {
  function save (u) {
    u.save(function (err) {
      callback(err, u)
    })
  }
  User
  .findById(userId)
  .exec(function (err, user) {
    if (err) return callback(err, user || null)
    if (fbId) user.fbId = fbId
    save(user)
  })
}
var _ = require('lodash')
var express = require('express')
var router = express.Router()
var PushModel = require('../models/push')
var webpush = require('web-push')

var vapidKeys = {
  publicKey: "BLPfteECnB-dwfVxR1lg8cY33qsgT68siqs5Rf1QSARQrj9Z9NVnfJbG4xjd8IeA28sJB8WzjL02FZ-TR3Ov8sM",
  privateKey: "HWtSc_raJgkH8w2cROlX_TL6l0zDahl8QKep4daS8vM"
}

webpush.setVapidDetails(
  'mailto:obetoferreira@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);


// GET /push
var getAll = function (req, res) {
  PushModel
    .find()
    .populate(['user'])
    .exec(function (err, subscriptions) {
      if (err) {
        console.log('Error: ' + err)
      } else {
        res.send(subscriptions)
      }
    })
}

// GET /push/:id
var getOne = function (req, res) {
  PushModel
    .findById(req.params.id)
    .populate(['user'])
    .exec(function (err, subscription) {
      if (err) {
        console.log('Error: ' + err)
      } else {
        res.send(subscription)
      }
    })
}

// DELETE /push/:id
var unsubscribe = function (req, res) {
  PushModel
    .find({ user: req.params.userId })
    .exec(function (err, subscriptions) {
      if (err) {
        console.log('Error: ' + err)
      } else if (subscriptions && subscriptions.length) {
        subscriptions.forEach(function (subscription) {
          subscription.remove(function (err) {
            if (err) {
              console.log('Error: ' + err)
            }
          })
        })
      }
    })
}

// POST /push
var subscribe = function (req, res) {
  PushModel
    .findOne({ subscription: req.body.subscription })
    .exec(function (err, model) {
      if (err) {
        console.log('Error: ' + err)
        return res.send(err)
      }

      if (model) {
        model.subscription = req.body.subscription
        model.save()
        return res.send(model)
      }
          
      var newModel = new PushModel()
      newModel.subscription = req.body.subscription
      newModel.user = req.body.userId
      newModel.save(function (err) {
        if (err) {
          console.log('Error: ' + err)
          res.send(err)
        } else {
          res.send(newModel)
        }
      })
    })
}


router.get('/', getAll)
router.post('/', subscribe)
router.get('/:id', getOne)
router.delete('/:userId', unsubscribe)

module.exports = router

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const db = require('../db/conn')
const jwt_decode = require('jwt-decode')
const ObjectId = require('mongodb').ObjectId

function authenticateToken(req, res, next) {

  const tokenFromCookie = req.cookies && req.cookies.accessToken

  if (!tokenFromCookie) return res.status(401).send({ 'status': '401', 'message': 'no token sent' })

  jwt.verify(tokenFromCookie, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.status(403).send(err)
    req.user = user

    next()
  })
}

function getUserId(req, res, next) {

  const accessToken = req.cookies && req.cookies.accessToken
  const decodedJwt = jwt_decode(accessToken)

  res.locals.userId = new ObjectId(decodedJwt.id)
  next()

}

router.get('/', authenticateToken, (req, res) => {
  const authenticatedUser = req.user.email
  if (authenticatedUser) {
    db
      .getUsersCollection()
      .findOne({ email: authenticatedUser }, (err, user) => {
        if (err) return res.send(err)

        return res.json({ email: authenticatedUser, firstName: user.firstName })
      })
  }
})

router.get('/adresses', authenticateToken, getUserId, (req, res) => {
  const userId = res.locals.userId;

  db
    .getAddressesCollection()
    .aggregate([
      {
        $match: { _id: ObjectId(userId) }
      },
      { $project: { "addresses.created": 0 } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          pipeline: [{ $project: { firstName: 1, lastName: 1 } }],
          as: "userInfo"
        },
      },
      {
        $unwind: "$userInfo"
      }
    ])
    .toArray(function (err, userAddresses) {
      if (err) return res.status(404).send({ "message": "user addresses not found" })

      return res.json(userAddresses[0])
    })
})


router.put('/adresses', authenticateToken, getUserId, (req, res) => {

  const userId = res.locals.userId;
  const addressId = req.body._id
  const { address, zipCode, city, country } = req.body

  db
    .getAddressesCollection()
    .updateOne({ _id: ObjectId(userId), "addresses._id": ObjectId(addressId) },
      { $set: { "addresses.$.address": address, "addresses.$.zipCode": zipCode, "addresses.$.city": city, "addresses.$.country": country } }, (err, response) => {
        if (err) return res.send(err)

        return res.json(response)
      })

})

router.post('/adresses', authenticateToken, getUserId, (req, res) => {
  const userId = res.locals.userId;

  db
    .getAddressesCollection()
    .updateOne({ _id: userId }, {
      $push: {
        "addresses": { ...req.body, _id: ObjectId(), created: new Date(Date.now()) }
      }
    }, (err, response) => {
      if (err) return res.send(err)

      return res.json(response)
    })
})

module.exports = router
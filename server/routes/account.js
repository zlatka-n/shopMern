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

//TODO: remove fn getUserId, get userId from request params?
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
        $match: { _id: userId }
      },
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

  db
    .getAddressesCollection()
    .updateOne({ _id: userId, "addresses._id": addressId },
      { $set: { "addresses.$": req.body } }, (err, response) => {
        if (err) return res.send(err)

        return res.json(response)
      })

})

module.exports = router
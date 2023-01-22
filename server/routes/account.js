const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const db = require('../db/conn')

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

  db
    .getUsersCollection()
    .findOne({ email: req.user.email }, (err, user) => {
      if (err) return res.status(403).send(err)

      res.locals.userId = user._id
      next()
    })

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
  db
    .getAddressesCollection()
    .aggregate([
      {
        $match: { _id: res.locals.userId }
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

module.exports = router
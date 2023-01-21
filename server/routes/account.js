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

module.exports = router
const express = require('express')
const router = express.Router()
const db = require('../conn')

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  db
    .getDb()
    .collection('users')
    .findOne({ email, password }, function (err, user) {

      if (err) res.send(err)

      if (user) res.status(409).send({ "status": "409", "message": "User already exists in db", "detail": "Ensure that email is not already registered" })

      //TODO: create a new user in db
      if (!user) {

        db
          .getDb()
          .collection('users')
          .insertOne({ email, password }, function (err) {

            if (err) res.send(err)

            res.status(200).send({ 'status': '200', 'message': 'New user was created' })

          })
      }
    })

})

router.post('/signup', (req, res) => {
  //1. find in db if user exists => send error msg or create a new user
  res.send(`Sign up: email: ${req.body.email}, password: ${req.body.password}`)
})

module.exports = router
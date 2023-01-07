const express = require('express')
const router = express.Router()
const db = require('../conn')
const bcrypt = require('bcrypt')

router.post('/signup', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const saltRounds = 10;

  db
    .getUsersCollection()
    .findOne({ email }, function (err, user) {

      if (err) res.send(err)

      if (user) {
        res.status(409).send({ "status": "409", "message": "User already exists in db", "detail": "Ensure that email is not already registered" })
        return
      }

      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) res.send(err)

        db
          .getUsersCollection()
          .insertOne({ email, password: hash }, function (err) {

            if (err) res.send(err)

            res.status(200).send({ 'status': '200', 'message': 'New user was created' })
          })
      })

    })

})

router.post('/login', (req, res) => {
  res.send(`Log in: email: ${req.body.email}, password: ${req.body.password}`)
})

module.exports = router
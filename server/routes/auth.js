const express = require('express')
const router = express.Router()
const db = require('../db/conn')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './config.env' })

const secretToken = process.env.SECRET_TOKEN

function createToken(account) {
  jwt.sign({ account }, secretToken)
}

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

      if (!user)
        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) res.send(err)

          db
            .getUsersCollection()
            .insertOne({ email, password: hash }, function (err) {

              if (err) res.send(err)

              res.send({ 'status': '200', 'message': 'New user was created' })
            })
        })

    })

})

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  //1] check if user exists in db
  db
    .getUsersCollection()
    .findOne({ email }, function (err, user) {
      if (err) res.send(err)

      if (!user) res.status(404).send({ "status": "404", "message": "User does not exist in db", "detail": "Ensure that email is registered" })

      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) res.send(err)

          if (!result) res.send('wrong password')

          if (result) {
            const accessToken = jwt.sign({ email: user.email }, secretToken)
            res.send({ "accessToken": accessToken })
            // res.send({ 'status': '200', 'message': 'User was logged in' })
          }

        })
      }
    })
})


module.exports = router
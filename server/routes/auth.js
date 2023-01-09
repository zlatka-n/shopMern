const express = require('express')
const router = express.Router()
const db = require('../db/conn')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './config.env' })

const secretToken = process.env.SECRET_TOKEN

router.post('/signup', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const saltRounds = 10;

  db
    .getUsersCollection()
    .findOne({ email }, function (err, user) {

      if (err) return res.send(err)

      if (user) {
        res.status(409).send({ "status": "409", "message": "User already exists in db", "detail": "Ensure that email is not already registered" })
        return
      }

      if (!user)
        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) return res.send(err)

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
      if (err) return res.send(err)

      if (!user) return res.status(404).send({ "status": "404", "message": "User does not exist in db", "detail": "Ensure that email is registered" })

      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) res.send(err)

          if (!result) res.send('wrong password')

          if (result) {
            //TODO: add expiration to access token, create refresh token

            const accessToken = jwt.sign({ email: user.email }, secretToken)

            //TODO: invalidate token when user logs out
            const refreshToken = jwt.sign({ email: user.email }, secretToken)

            res.cookie('accessToken', accessToken)
            res.cookie('refreshToke', refreshToken)

            ///TODO: store a jwt in a cookie, https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81
            res.send({ 'status': '200', 'message': 'User was logged in', "accessToken": accessToken })
          }

        })
      }
    })
})


module.exports = router
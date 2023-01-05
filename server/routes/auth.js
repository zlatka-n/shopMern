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

      if (err) res.json(err)

      if (user) res.status(409).send('409: User already exists')

      //TODO: create a new user in db
      if (!user) {
        res.status(200).send('New user created')
      }
    })

})

router.post('/signup', (req, res) => {
  //1. find in db if user exists => send error msg or create a new user
  res.send(`Sign up: email: ${req.body.email}, password: ${req.body.password}`)
})

module.exports = router
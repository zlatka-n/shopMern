const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
  res.send(`Log in: ${req.body.email}, ${req.body.password}`)
})

router.post('/signup', (req, res) => {
  res.send(`Sign up: ${req.body.email}, ${req.body.password}`)
})

module.exports = router
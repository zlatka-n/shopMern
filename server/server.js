const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const db = require('./db/conn')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

require('dotenv').config({ path: './config.env' })


app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]


  if (!token) return res.status(401).send({ 'status': '401', 'message': 'no token sent' })

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.status(403).send(err)
    req.user = user

    next()
  })
}

app.get('/', authenticateToken, (req, res) => {
  const authenticatedUser = req.user.email

  if (authenticatedUser) {
    db
      .getDb()
      .collection('products')
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }
})

app.use('/account', authRoutes)

app.listen(port, () => {
  db.connectToMongoDb((err) => console.log(err))

  console.log(`Listening on port ${process.env.PORT}`)
})





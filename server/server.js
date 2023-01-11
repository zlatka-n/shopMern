const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const db = require('./db/conn')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const accountRoutes = require('./routes/account')

// const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

require('dotenv').config({ path: './config.env' })


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use(bodyParser.json())
app.use(cookieParser())


// app.get('/', authenticateToken, (req, res) => {
//   console.log('get')

//   const authenticatedUser = req.user.email
//   if (authenticatedUser) {
//     db
//       .getDb()
//       .collection('products')
//       .find({})
//       .toArray(function (err, result) {
//         if (err) throw err;
//         res.json(result);
//       });
//   }
// })

app.use('/account', authRoutes)
app.use('/home', accountRoutes)

app.listen(port, () => {
  db.connectToMongoDb((err) => console.log(err))

  console.log(`Listening on port ${process.env.PORT}`)
})





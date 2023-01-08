const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const db = require('./db/conn')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')

require('dotenv').config({ path: './config.env' })


app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {

  // db
  //   .getDb()
  //   .collection('products')
  //   .find({})
  //   .toArray(function (err, result) {
  //     if (err) throw err;
  //     res.json(result);
  //   });

  db
    .getDb()
    .collection('products')
    .find({})
    .toArray()
    .then(data => res.json(data))
    .catch(error => res.json(error))
})

app.use('/account', authRoutes)

app.listen(port, () => {
  db.connectToMongoDb((err) => console.log(err))

  console.log(`Listening on port ${process.env.PORT}`)
})





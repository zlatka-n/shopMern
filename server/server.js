const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const db = require('./conn')
const cors = require('cors')

require('dotenv').config({ path: './config.env' })


app.use(cors())

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

app.listen(port, () => {
  db.connectToMongoDb((err) => console.log(err))

  console.log(`Listening on port ${process.env.PORT}`)
})





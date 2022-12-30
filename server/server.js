const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const db = require('./conn')

require('dotenv').config({ path: './config.env' })


app.get('/', (req, res) => {
  res.send('GET request made')
})

app.listen(port, () => {
  db.connectToMongoDb((err) => console.log(err))

  console.log(`Listening on port ${process.env.PORT}`)
})





const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const db = require('./conn')
const cors = require('cors')

require('dotenv').config({ path: './config.env' })


app.use(cors())

app.get('/', (req, res) => {
  res.send('GET request made')
})

app.listen(port, () => {
  db.connectToMongoDb((err) => console.log(err))

  console.log(`Listening on port ${process.env.PORT}`)
})





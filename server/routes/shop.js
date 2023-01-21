const express = require('express')
const router = express.Router()
const db = require('../db/conn')

router.get('/', (req, res) => {

  db
    .getDb()
    .collection('products')
    .find()
    .toArray((err, result) => {
      if (err) return res.status(404).send({ "status": "404", "message": "resource not found" })

      return res.json(result)
    })


})

module.exports = router
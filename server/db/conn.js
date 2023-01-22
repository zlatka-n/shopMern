const { MongoClient } = require('mongodb')
require('dotenv').config({ path: './config.env' })

const client = new MongoClient(process.env.ATLAS_URI)

let _db

module.exports = {
  connectToMongoDb: function (cb) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db('shopMern')
        console.log('Connected to mongoDb')
      }

      if (err) cb(err)

    })
  },
  getDb: function () {
    return _db
  },
  getUsersCollection: function () {
    return _db.collection('users')
  },
  getAddressesCollection: function () {
    return _db.collection('addresses')
  }
}
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('../app')

dotenv.config()

const { PORT = 3000, DB_HOST } = process.env

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful')
    })
  })
  .catch((err) => {
    console.log(`Mongoose error ${err}`)
    process.exit(1)
  })

mongoose.connection.on('disconnected', (err) => {
  console.log(`Mongoose disconnected ${err}`)
})

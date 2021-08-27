const app = require('../app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const { PORT = 3000, DB_HOST } = process.env

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      // console.log(`Server running. Use our API on port: ${PORT}`)
      console.log('Database connection successful')
      // process.on('SIGINT', () => {
      //   client.close()
      //   console.log('Connection to DB closed and app termination')
      //   process.exit(1)
    })
  })
  .catch((err) => {
    console.log(`Mongoose error ${err.message}`)
  })

mongoose.connection.on('disconnected', (err) => {
  console.log(`Mongoose disconnected ${err.message}`)
})

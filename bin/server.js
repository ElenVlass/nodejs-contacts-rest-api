const app = require('../app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// const express = require('express')
// const cors = require('cors')

dotenv.config()

const { PORT = 3000, DB_HOST } = process.env

// const app = express()
// app.use(cors())
// app.get('/', (req, res) => {
//   res.send('<h2>Home page</h2>')
// })

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  }).catch((err) => {
    console.log(err)
  })
// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`)
// })

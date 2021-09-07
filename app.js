const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const { contactsRouter } = require('./routes/api')
const { authRouter } = require('./routes/api')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)

app.use((_, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/contacts',
    data: 'Not found',
  })
})

app.use((err, _, res, __) => {
  console.log(err)
  const { status = 500, message = 'Server error', name = 'fail' } = err
  res.status(500).json({
    status: name,
    code: status,
    message
  })
})

module.exports = app

const router = require('express').Router()

const authRouter = require('./auth')
const contactsRouter = require('./contacts')

router.use('/contacts', contactsRouter)
router.use('/users', authRouter)

module.exports = router

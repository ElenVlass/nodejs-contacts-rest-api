const router = require('express').Router()

const { users: controller } = require('../../controllers')
const { joiValidation } = require('../../validation')
const { userJoiSchema } = require('../../models/user')
const authentificate = require('../../middleware/authentificate')

const validationMiddleWare = joiValidation(userJoiSchema)

router.post('/signup', validationMiddleWare, controller.signup)
router.post('/login', authentificate, validationMiddleWare, controller.login)
router.get('/logout', authentificate, controller.logout)

module.exports = router

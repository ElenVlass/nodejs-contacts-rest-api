const router = require('express').Router()

const { users: controller } = require('../../controllers')
const { joiValidation } = require('../../validation')
const { userJoiSchema } = require('../../models/user')

const validationMiddleWare = joiValidation(userJoiSchema)

router.post('/signup', validationMiddleWare, controller.signup)
router.post('/login', validationMiddleWare, controller.login)
// router.post('/logout', controller.logout)
// router.post('/current', controller.current)

module.exports = router

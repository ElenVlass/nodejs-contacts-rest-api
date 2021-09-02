const router = require('express').Router()

const { users: controller } = require('../../controllers')
const { joiValidation } = require('../../validation')
const { userJoiSchema } = require('../../models/user')

const validationMiddleWare = joiValidation(userJoiSchema)

router.post('/users/signup', validationMiddleWare, controller.signup)
// router.post('/users/login', controller.login)
// router.post('/users/logout', controller.logout)
// router.post('/users/current', controller.current)

module.exports = router

const router = require('express').Router()

const { users: controller } = require('../../controllers')

router.post('/users/signup', controller.signup)
// router.post('/users/login', controller.login)
// router.post('/users/logout', controller.logout)
// router.post('/users/current', controller.current)

module.exports = router

const router = require('express').Router()
const rateLimit = require('express-rate-limit')

const { users: controller } = require('../../controllers')
const { joiValidation } = require('../../validation')
const { userJoiSchema } = require('../../models/user')
const { authentificate, uploadImage } = require('../../middlewares')

const validationMiddleWare = joiValidation(userJoiSchema)

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 10 requests
  message:
      'Too many accounts created from this IP, please try again after an hour'
})

router.post('/signup', createAccountLimiter, validationMiddleWare, controller.signup)
router.get('/verify/:verificationToken', controller.emailVerification)
router.post('/login', authentificate, validationMiddleWare, controller.login)
router.post('/logout', authentificate, controller.logout)
router.get('/current', authentificate, controller.current)
router.patch('/', authentificate, controller.subscription)
router.patch('/avatars', authentificate, uploadImage.single('avatar'), controller.updateAvatar)

module.exports = router

const router = require('express').Router()

const { contacts: controller } = require('../../controllers')
const { joiValidation } = require('../../validation')
const { contactJoiSchema } = require('../../models/contact')
const authentificate = require('../../middlewares/authentificate')

const validationMiddleWare = joiValidation(contactJoiSchema)

router
  .get('/', authentificate, controller.getList)
  .post('/', authentificate, validationMiddleWare, controller.addNew)

router
  .get('/:contactId', authentificate, controller.getById)
  .put('/:contactId', authentificate, validationMiddleWare, controller.updateById)
  .delete('/:contactId', authentificate, controller.remove)

router.patch('/:contactId/favorite', controller.updateStatusContact)

module.exports = router

const router = require('express').Router()

const { contacts: controller } = require('../../controllers')
const { joiValidation } = require('../../validation')
const { contactJoiSchema } = require('../../models/contact')

const validationMiddleWare = joiValidation(contactJoiSchema)

router
  .get('/', controller.getList)
  .post('/', validationMiddleWare, controller.addNew)

router
  .get('/:contactId', controller.getById)
  .put('/:contactId', validationMiddleWare, controller.updateById)
  .delete('/:contactId', controller.remove)

router.patch('/:contactId/favorite', controller.updateStatusContact)

module.exports = router

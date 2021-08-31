const router = require('express').Router()

const controller = require('../../controllers')
const { joiValidation } = require('../../validation')
const { contactJoiSchema } = require('../../models/contacts')

const validationMiddleWare = joiValidation(contactJoiSchema)

router.get('/', controller.getList)

router.get('/:contactId', controller.getById)

router.post('/', validationMiddleWare, controller.addNew)

router.delete('/:contactId', controller.remove)

router.put('/:contactId', validationMiddleWare, controller.updateById)

router.patch('/:contactId/favorite', controller.updateStatusContact)

module.exports = router

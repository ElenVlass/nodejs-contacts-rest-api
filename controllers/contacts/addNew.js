const contactsOperations = require('../../model/contacts')
const contactJoiSchema = require('../../validation')

const addNew = async (req, res, next) => {
  try {
    const { error } = contactJoiSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: 'missing required name field'
      })
    }
    const newContact = await contactsOperations.addContact(req.body)
    res.status(201).json({
      newContact
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addNew

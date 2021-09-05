const { Contact } = require('../../models')
const { NotFound } = require('http-errors')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
const { CONTACT_NOT_FOUND } = require('../../helpers/error-messages')

async function updateStatusContact(req, res, next) {
  const { contactId } = req.params
  const { favorite } = req.body
  const updatedContactById = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  if (!updatedContactById) {
    throw NotFound(CONTACT_NOT_FOUND)
  }
  res.status(200).json({
    updatedContactById
  })
}

module.exports = asyncCtrlWrapper(updateStatusContact)

const mongoose = require('mongoose')
const { NotFound } = require('http-errors')
const { Contact } = require('../../models')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
const { CONTACT_NOT_FOUND } = require('../../helpers/error-messages')

const remove = async (req, res, next) => {
  const { contactId } = req.params
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw NotFound(CONTACT_NOT_FOUND)
  }
  const removeContact = await Contact.findByIdAndDelete(contactId)
  if (!removeContact) {
    throw NotFound(CONTACT_NOT_FOUND)
    // return res.status(404).json({
    //   message: `Contact ${contactId} was not found` })
  }
  res.status(200).json({
    message: 'Contact deleted'
  })
}

module.exports = asyncCtrlWrapper(remove)

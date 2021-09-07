const mongoose = require('mongoose')
const { Contact } = require('../../models')
const { NotFound } = require('http-errors')
const { CONTACT_NOT_FOUND } = require('../../helpers/error-messages')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')

const getById = async (req, res, next) => {
  const { contactId } = req.params
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw NotFound(CONTACT_NOT_FOUND)
  }
  const contact = await Contact.findById(contactId)
  console.log(contact)
  if (!contact) {
    throw NotFound(CONTACT_NOT_FOUND)
  }
  res.status(200).json({
    status: 'OK',
    code: 200,
    data: { contact }
  })
}

module.exports = asyncCtrlWrapper(getById)

const { NotFound } = require('http-errors')
const { Contact } = require('../../models')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
const { CONTACT_NOT_FOUND } = require('../../helpers/error-messages')

const updateById = async (req, res, next) => {
  const { contactId } = req.params
  const updatedContactById = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!updatedContactById) {
    throw NotFound(CONTACT_NOT_FOUND)
  }
  res.status(200).json({
    updatedContactById
  })
}

module.exports = asyncCtrlWrapper(updateById)

const { Contact } = require('../../models')

async function updateStatusContact(req, res, next) {
  try {
    const { contactId } = req.params
    const { favorite } = req.body
    const updatedContactById = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
    if (!updatedContactById) {
      return res.status(404).json({
        status: 'Not found',
        code: 404,
        message: `Contact ${contactId} was not found`
      })
    }
    res.status(200).json({
      updatedContactById
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateStatusContact

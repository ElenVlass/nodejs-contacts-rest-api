const { Contact } = require('../../models')

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const removeContact = await Contact.findByIdAndDelete(contactId)
    if (!removeContact) {
      return res.status(404).json({
        message: `Contact ${contactId} was not found`
      })
    }
    res.status(200).json({
      message: 'Contact deleted'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = remove

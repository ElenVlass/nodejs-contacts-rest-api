const { Contact } = require('../../models')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findById(contactId)
    if (!contact) {
      return res.status(404).json({
        status: 'Not found',
        code: 404,
        message: `Contact ${contactId} was not found`
      })
    }
    res.status(200).json({
      status: 'OK',
      code: 200,
      data: { contact }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getById

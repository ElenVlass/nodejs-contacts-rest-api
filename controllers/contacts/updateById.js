const { Contact } = require('../../models')

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const updatedContactById = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
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

module.exports = updateById

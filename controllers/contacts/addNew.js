const { Contact } = require('../../models')

const addNew = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body)
    res.status(201).json({
      status: 'Success',
      code: 201,
      result
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addNew

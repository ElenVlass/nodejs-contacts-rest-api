const { Contact } = require('../../models')

const getList = async (req, res, next) => {
  try {
    const contacts = await Contact.find({})
    res.status(200).json({
      status: 'OK',
      code: 200,
      data: { contacts }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getList

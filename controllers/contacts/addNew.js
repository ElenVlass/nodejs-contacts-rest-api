const { Contact } = require('../../models')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')

const addNew = async (req, res, next) => {
  // const result = await Contact.create(req.body)
  const newContact = { ...req.body, owner: req.user._id }
  const result = await Contact.create(newContact)
  res.status(201).json({
    status: 'Success',
    code: 201,
    result
  })
}

module.exports = asyncCtrlWrapper(addNew)

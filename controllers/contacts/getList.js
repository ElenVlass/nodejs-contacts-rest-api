const { Contact } = require('../../models')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')

const getList = async (req, res, next) => {
  const contacts = await Contact.find({ owner: req.user._id }).populate('owner', 'id email')
  res.status(200).json({
    status: 'OK',
    code: 200,
    data: { contacts }
  })
}

module.exports = asyncCtrlWrapper(getList)

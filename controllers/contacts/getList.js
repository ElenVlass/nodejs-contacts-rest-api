const { Contact } = require('../../models')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')

const getList = async (req, res, next) => {
  /* const contacts = await Contact.find({ owner: req.user._id }).populate('owner', 'id email') // if within authentification */
  const { page = 1, limit = 20 } = req.query
  const skip = (page - 1) * limit
  const total = await Contact.estimatedDocumentCount() // or const allContacts = await Contact.find({}); const total = allContacts.length;
  let contacts = await Contact.find({}, 'name email phone', { skip, limit: Number(limit) })
  if (req.query.favorite === 'true') {
    contacts = await Contact.find({ favorite: true }, 'name email phone', { skip, limit: Number(limit) })
  }
  res.status(200).json({
    status: 'OK',
    code: 200,
    data: {
      total,
      pages: Math.ceil(total / limit),
      contacts
    }
  })
}

module.exports = asyncCtrlWrapper(getList)

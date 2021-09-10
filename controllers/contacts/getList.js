const { Contact } = require('../../models')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')

const getList = async (req, res, next) => {
  const userOwnContacts = { owner: req.user._id } // query to db
  const {
    limit = 2,
    offset = 0,
    sortBy,
    sortByDesc,
    filter
  } = req.query // query from frontend

  const queryOptions = {
    limit,
    offset,
    populate: {
      path: 'owner',
      select: 'email -_id'
    },
    sort: `${sortBy} -${sortByDesc}`,
    select: filter ? filter.split('|').join(' ') : 'name email phone -_id'
  }
  const { docs: contacts, ...rest } = await Contact.paginate(userOwnContacts, queryOptions)

  res.status(200).json({
    status: 'OK',
    code: 200,
    data: { contacts, ...rest }
  })
}

module.exports = asyncCtrlWrapper(getList)

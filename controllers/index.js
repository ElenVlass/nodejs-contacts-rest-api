const getList = require('./contacts/getList')
const addNew = require('./contacts/addNew')
const getById = require('./contacts/getById')
const remove = require('./contacts/remove')
const updateById = require('./contacts/updateById')
const updateStatusContact = require('./contacts/updateStatusContact')

module.exports = {
  getList,
  addNew,
  getById,
  remove,
  updateById,
  updateStatusContact
}

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const { Unauthorized } = require('http-errors')
const { User } = require('../../models')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
// const { LOGIN_AUTH } = require('../../helpers/error-messages')

const logout = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { token: null })
  res.json({
    status: 'OK',
    code: 200,
    message: 'Success logout'

  })
}

module.exports = asyncCtrlWrapper(logout)

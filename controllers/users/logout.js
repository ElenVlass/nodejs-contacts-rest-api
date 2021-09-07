const { User } = require('../../models')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
const { Unauthorized } = require('http-errors')
const { ANAUTORIZED } = require('../../helpers/error-messages')

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null })
  } catch (error) {
    throw new Unauthorized(ANAUTORIZED)
  }
  res.status(204).json({
    status: 'No Content',
    code: 204,
    message: 'Success logout'

  })
}

module.exports = asyncCtrlWrapper(logout)

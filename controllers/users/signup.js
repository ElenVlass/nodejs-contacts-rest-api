const { User } = require('../../models')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
const { CONFLICT } = require('../../helpers/error-messages')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  const isAlreadyExist = await User.findOne({ email })
  if (isAlreadyExist) {
    return next(Conflict(CONFLICT))
  }
  const defaultAvatar = gravatar.url(email, {}, true)
  const newUser = new User({ email, password, avatarURL: defaultAvatar })
  await newUser.save()
  res.status(201).json({
    status: 201,
    code: 'Created',
    message: 'Success registered',
    data: {
      email: newUser.email,
      subscription: newUser.subscription
    }
  })
}

module.exports = asyncCtrlWrapper(signup)

const fs = require('fs/promises')
const path = require('path')
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

  const defaultAvatar = gravatar.url(email, { d: 'wavatar' }, true)
  const newUser = new User({ email, password, avatarURL: defaultAvatar })
  await newUser.save()

  const avatarDir = path.join(__dirname, '../../', 'public/avatars')
  const avatarPathName = path.join(avatarDir, newUser.id)
  await fs.mkdir(avatarPathName)

  res.status(201).json({
    status: 201,
    code: 'Created',
    message: 'Success registered',
    data: {
      email: newUser.email,
      subscription: newUser.subscription,
      image: newUser.avatarURL
    }
  })
}

module.exports = asyncCtrlWrapper(signup)

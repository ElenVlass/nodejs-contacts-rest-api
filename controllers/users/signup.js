const { User } = require('../../models')
const { Conflict } = require('http-errors')
// const bcrypt = require('bcryptjs')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
const { CONFLICT } = require('../../helpers/error-messages')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  const isAlreadyExist = await User.findOne({ email })
  if (isAlreadyExist) {
    return next(Conflict(CONFLICT))
  }
  /* const newUser = await User.create({ email, password })

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const newUser = await User.create({ email, password: hashedPassword }) */

  const newUser = new User({ email, password })
  // newUser.setSaltPassword(password)
  await newUser.save()

  res.status(201).json({
    status: 201,
    code: 'success',
    message: 'Success registered',
    data: { newUser }
  })
}

module.exports = asyncCtrlWrapper(signup)

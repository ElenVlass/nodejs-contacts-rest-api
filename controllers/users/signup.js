const { User } = require('../../models')
const { Conflict } = require('http-errors')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
const { CONFLICT } = require('../../helpers/error-messages')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  const isAlreadyExist = await User.findOne({ email })
  if (isAlreadyExist) {
    return next(Conflict(CONFLICT))
  }
  /* const newUser = await User.create({ email, password }); const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10)); const newUser = await User.create({ email, password: hashedPassword }); newUser.setSaltPassword(password) */
  const newUser = new User({ email, password })
  await newUser.save()

  /* const { SECRET_KEY } = process.env; const payload = { id: newUser._id }; const token = jwt.sign(payload, SECRET_KEY) */

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

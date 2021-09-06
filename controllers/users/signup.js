const { User } = require('../../models')
const { Conflict } = require('http-errors')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
const { CONFLICT } = require('../../helpers/error-messages')

const { SECRET_KEY } = process.env

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

  const payload = { id: newUser._id }
  const token = jwt.sign(payload, SECRET_KEY)

  res.status(201).json({
    status: 201,
    code: 'success',
    message: 'Success registered',
    data: { newUser, token }
  })
}

module.exports = asyncCtrlWrapper(signup)

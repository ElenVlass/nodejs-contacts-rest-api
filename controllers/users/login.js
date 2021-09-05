// const bcrypt = require('bcryptjs')
const { Unauthorized } = require('http-errors')
const { User } = require('../../models')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
const { LOGIN_AUTH } = require('../../helpers/error-messages')

const login = async(req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw new Unauthorized('Email or password is wrong')
  }
  /* const hashedPassword = user.password
    const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword)
    if (!isPasswordCorrect) { throw new Unauthorized() } */
  const isPasswordCorrect = user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new Unauthorized(LOGIN_AUTH)
  }

  const token = 'cvghjhjml,jhghknl'
  res.status(200).json({
    token
  })
}

module.exports = asyncCtrlWrapper(login)

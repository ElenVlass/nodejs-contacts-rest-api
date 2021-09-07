// const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { User } = require('../../models')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
const { LOGIN_AUTH } = require('../../helpers/error-messages')

const login = async(req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  /* const hashedPassword = user.password
    const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword) */
  const isPasswordCorrect = user?.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new Unauthorized(LOGIN_AUTH)
  }

  const payload = { id: user._id }
  const { SECRET_KEY } = process.env
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '4h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription
    }
  })
}

module.exports = asyncCtrlWrapper(login)

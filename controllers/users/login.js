// const bcrypt = require('bcryptjs')
const { User } = require('../../models')

const login = async(req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const isPasswordCorrect = user.comparePassword(password)

    if (!user || !isPasswordCorrect) {
      return res.status(401).json({
        code: 401,
        error: 'Unauthorized',
        message: 'Email or password is wrong'
      })
    }
    /* const hashedPassword = user.password
    const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword)
    if (!isPasswordCorrect) {
      return res.code(401).json({ message: 'Email or password is wrong'})
    } */
    const token = 'cvghjhjml,jhghknl'
    res.status(200).json({
      token
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login

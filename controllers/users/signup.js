const { User } = require('../../models')
// const bcrypt = require('bcryptjs')

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const isAlreadyExist = await User.findOne({ email })
    if (isAlreadyExist) {
      return res.status(409).json({
        status: 409,
        code: 'error',
        message: 'Email in use'
      })
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
  } catch (error) {
    next(error)
  }
}

module.exports = signup

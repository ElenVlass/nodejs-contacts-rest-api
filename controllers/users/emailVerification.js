const { NotFound } = require('http-errors')
const { ANAUTORIZED } = require('../../helpers/error-messages')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
const { User } = require('../../models')

const emailVerification = async(req, res, next) => {
  try {
    const { verificationToken } = req.params
    await User.findOneAndUpdate({ verificationToken }, { verificationToken: null, verify: true }, { new: true })

    res.status(200).send('<h2>Your email has been confirmed</h2>')
  } catch (error) {
    throw NotFound(ANAUTORIZED)
  }
}

module.exports = asyncCtrlWrapper(emailVerification)

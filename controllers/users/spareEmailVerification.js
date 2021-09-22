const { BadRequest, Unauthorized } = require('http-errors')
const { v4 } = require('uuid')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
const { LOGIN_AUTH } = require('../../helpers/error-messages')
const { User } = require('../../models')
const sendEmail = require('../../helpers/sendEmail')

const spareEmailVerification = async(req, res, next) => {
  if (!req.body.email) { throw BadRequest('Missing required field email') }
  const verificationToken = v4()
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    // console.log(user)
    if (user.verify) {
      throw BadRequest('Verification has already been passed')
    } else {
      const verificationMassage = {
        to: email,
        subject: "Verification user's email",
        html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Please, verificate your email</a>`
      }
      await sendEmail(verificationMassage)
      await User.findByIdAndUpdate(user._id, { verificationToken })
      res.status(200).json({ message: `Verification email sent with token ${verificationToken}` })
    }
  } catch (error) {
    throw Unauthorized(LOGIN_AUTH)
  }
}

module.exports = asyncCtrlWrapper(spareEmailVerification)

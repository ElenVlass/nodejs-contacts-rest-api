const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const asyncWrapper = require('../helpers/ctrlAsyncWrapper')
const { LOGIN_AUTH } = require('../helpers/error-messages')
const { User } = require('../models')

const { SECRET_KEY } = process.env

const authenticate = async (req, _, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized(LOGIN_AUTH)
    };
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findOne({ token })
    if (id !== String(user._id)) {
      throw new Unauthorized(LOGIN_AUTH)
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = asyncWrapper(authenticate)

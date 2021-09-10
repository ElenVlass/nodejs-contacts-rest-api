require('../config/passport')
const passport = require('passport')
const { Unauthorized } = require('http-errors')
const { ANAUTORIZED } = require('../helpers/error-messages')

const authentificate = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    let token = null
    if (req.get('Authorization')) {
      token = req.get('Authorization').split(' ')[1]
    }
    if (!user || err || token !== user.token) {
      throw new Unauthorized(ANAUTORIZED)
    }
    req.user = user
    return next()
  })(req, res, next)
}

module.exports = authentificate

/* const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env
const { LOGIN_AUTH } = require('../helpers/error-messages')
const { User } = require('../models')

const authentificate = async (req, _, next) => {
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
module.exports = authentificate */

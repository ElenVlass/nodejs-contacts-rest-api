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

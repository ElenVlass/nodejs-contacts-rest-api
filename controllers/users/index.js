const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const subscription = require('./subscription')
const updateAvatar = require('./updateAvatar')
const emailVerification = require('./emailVerification')
const spareEmailVerification = require('./spareEmailVerification')

module.exports = {
  signup,
  login,
  logout,
  current,
  subscription,
  updateAvatar,
  emailVerification,
  spareEmailVerification
}

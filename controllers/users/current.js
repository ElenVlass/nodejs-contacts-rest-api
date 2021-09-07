const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')

const current = async(req, res, next) => {
  const user = req.user
  res.status(200).json({
    email: user.email,
    subscription: user.subscription
  })
}

module.exports = asyncCtrlWrapper(current)

const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')
const { Subscription } = require('../../helpers/constants')
const { User } = require('../../models')

const subscription = async(req, res, next) => {
  const { subscription } = req.body
  const { _id: userId, subscription: currentSubscription, email } = req.user
  if (subscription !== currentSubscription) {
    switch (subscription) {
      case Subscription.STARTER:
      case Subscription.PRO:
      case Subscription.BUSINESS:
        await User.findByIdAndUpdate(userId, { subscription }, { new: true })
        break

      default:
        break
    }
  }
  res.status(200).json({
    email,
    subscription
  })
}

module.exports = asyncCtrlWrapper(subscription)

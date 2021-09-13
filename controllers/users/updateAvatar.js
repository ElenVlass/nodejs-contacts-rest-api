const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')

const updateAvatar = async(req, res, next) => {
  console.log(req.file)
  res.status(200).json({
  })
}

module.exports = asyncCtrlWrapper(updateAvatar)

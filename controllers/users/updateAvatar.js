const fs = require('fs/promises')
const path = require('path')
const { User } = require('../../models')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')

const updateAvatar = async(req, res, next) => {
  const { path: tmpPath, originalname } = req.file
  const { id } = req.user
  const avatarDir = path.join(__dirname, '../../', 'public/avatars')
  const pathName = path.join(avatarDir, id)
  try {
    await fs.mkdir(pathName)
  } catch (error) {
    console.log(error)
  }
  const avatarPath = path.join(avatarDir, id, originalname)
  const avatarRelativePath = `/public/avatars/${id}/originalname`
  console.log(avatarPath)
  try {
    await fs.rename(tmpPath, avatarPath)
    await User.findByIdAndUpdate(id, { avatarURL: avatarRelativePath })
    res.status(201).json({
      status: 'Success',
      code: 201,
      data: {
        avatar: avatarRelativePath
      }
    })
  } catch (error) {
    await fs.unlink(tmpPath)
    next(error)
  }
}

module.exports = asyncCtrlWrapper(updateAvatar)

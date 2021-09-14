const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')
const { User } = require('../../models')
const asyncCtrlWrapper = require('../../helpers/ctrlAsyncWrapper')

const updateAvatar = async(req, res, next) => {
  const { path: tmpPath, originalname } = req.file
  const { id } = req.user

  const avatarPath = path.join(__dirname, '../../', 'public/avatars/', id, originalname)
  const avatarRelativePath = `/avatars/${id}/${originalname}`

  try {
    const redusedAvatar = await Jimp.read(tmpPath)
    await redusedAvatar.resize(250, 250).write(tmpPath)
  } catch (error) {
    next(error)
  }

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

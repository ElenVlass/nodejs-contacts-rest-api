const multer = require('multer')
const path = require('path')

const temporaryDir = path(__dirname, './', 'tmp')

const multerConfigs = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, temporaryDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 1024
  }
})

const upload = multer({
  storage: multerConfigs
})

module.exports = upload

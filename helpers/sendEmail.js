const sdGreed = require('@sendgrid/mail')

const { SENGRID_MY_KEY } = process.env

sdGreed.setApiKey(SENGRID_MY_KEY)

const sendEmail = async(data) => {
  try {
    const mail = { ...data, from: 'vlelen475@gmail.com' }
    await sdGreed.send(mail)
    return true
  } catch (error) {
    throw new Error(error.message, 307)
  }
}

module.exports = sendEmail

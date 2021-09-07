const { BadRequest } = require('http-errors')
const { BAD_REQUEST } = require('../helpers/error-messages')

const joiValidation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      throw BadRequest(BAD_REQUEST)
    }
    next()
  }
}

module.exports = joiValidation

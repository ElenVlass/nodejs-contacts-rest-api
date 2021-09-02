const { Schema, model } = require('mongoose')
const Joi = require('joi')

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    match: regex,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

const userJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(regex).required(),
  subscription: Joi.string(),
  token: Joi.string()
})

const User = model('user', userSchema)

module.exports = {
  User,
  userJoiSchema
}

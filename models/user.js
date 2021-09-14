const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const { Subscription } = require('../helpers/constants')

const SALT_WORK_FACTOR = 10
const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8
  },
  email: {
    type: String,
    match: regex,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
    default: Subscription.STARTER
  },
  avatarURL: {
    type: String,
    default: ''
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

/* userSchema.methods.setSaltPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR))
} */
userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(SALT_WORK_FACTOR))
  }
  next()
})

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const userJoiSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(regex).required(),
  subscription: Joi.string(),
  token: Joi.string()
})

const User = model('user', userSchema)

module.exports = {
  User,
  userJoiSchema
}

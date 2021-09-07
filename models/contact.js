const { Schema, model } = require('mongoose')
const Joi = require('joi')

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact']
  },
  email: {
    type: String,
    unique: true,
    match: regex
  },
  phone: {
    type: String,
    unique: true
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true })

const contactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(regex).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  contactJoiSchema
}

const { model, Schema, SchemaTypes } = require('mongoose')

const ownerSchema = Schema({
  type: SchemaTypes.ObjectId,
//   ref: 'user',
}, { versionKey: false, timestamps: true })

const Owner = model('owner', ownerSchema)

module.exports = Owner

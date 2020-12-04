const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema.Types


const LinkSchema = new Schema({
  id: ObjectId,
  createdAt: {type: Date, 'default': Date.now},
  description: String,
  url: String,
  postedBy: {type: ObjectId, ref: 'User'},
  postedById: Number
})


const UserSchema = new Schema({
  id: ObjectId,
  name: String,
  email: {type: String, unique: true},
  password: String,
  links: [LinkSchema]
})


module.exports = {
  LinkSchema, UserSchema
}

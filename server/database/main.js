const mongoose = require('mongoose')

const {LinkSchema, UserSchema} = require('./schema')
const url = process.env.MONGO_URL + '/foobar'

mongoose.connect(url, {useNewUrlParser: true})
.catch(err => console.log(err))

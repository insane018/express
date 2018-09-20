const config = require('config-lite')(__dirname)
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(config.mongodb)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
  console.log('we’re connected!')
})

const userSchema = new Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  avatar: {type: String, require: true},
  gender: {type: String, enum: ['m', 'f', 'x'], default: 'x'},
  bio: {type: String, required: true}
})

userSchema.methods.speak = function() {
  const greeting = this.name ? this.name : 'I don’t have a name'
  console.log(greeting)
}

const user = mongoose.model('User', userSchema)
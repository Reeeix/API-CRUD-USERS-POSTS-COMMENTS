const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    role : { type: String, trim: true, required:true }
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', function () {
     this.password = bcrypt.hashSync(this.password, 10)
   
 })

const User = mongoose.model('users', userSchema, 'users');
module.exports = User
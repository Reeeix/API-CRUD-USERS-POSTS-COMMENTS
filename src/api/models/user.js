const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    role : { type: String, trim: true, enum: ["user", "admin"], default: "user" }
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', function () {
     if (!this.isModified('password')) {
      return;
     }

     this.password = bcrypt.hashSync(this.password, 10)
   
 })

const User = mongoose.model('users', userSchema, 'users');
module.exports = User
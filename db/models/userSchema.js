'use strict';
const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let userSchema = new Schema (
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true
    },
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    role:{
      type: String,
      enum:['student', 'teacher', 'admin'],
      default: 'student'
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    isVerified:{
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function(next){
  bcrypt.hash(this.password, 10, (err, hash) => {
		if (err) next();
		this.password = hash;
		next();
	});
})

let User = mongoose.model ('user', userSchema);
module.exports = User;

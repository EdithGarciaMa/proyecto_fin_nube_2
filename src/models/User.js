/* const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
    //user: {
    //  type: String,
    //  required: true,
    //},
  }
  //{
  //  timestamps: true,
  //}
);

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema) */




const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

//module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('users', userSchema);



//export default model("Note", NoteSchema);




//import { Schema, model } from "mongoose";
//import bcrypt from "bcryptjs";

//const UserSchema = new Schema(
//  {
//    name: { type: String, trim: true },
//    email: { type: String, required: true, unique: true, trim: true },
//    password: { type: String, required: true },
//    date: { type: Date, default: Date.now },
//  },
//  {
//    timestamps: true,
//    versionKey: false,
//  }
//);


//export default model("User", UserSchema);

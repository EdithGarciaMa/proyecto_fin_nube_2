const mongoose = require('mongoose');
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

module.exports = mongoose.model('User', UserSchema)
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

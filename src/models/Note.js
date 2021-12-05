//import { Schema, model, Mongoose } from "mongoose";
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    user: {
      type: String,
      required: true,
    }
  }
  //{
  //  timestamps: true,
  //}
);

module.exports = mongoose.model('Note', NoteSchema)
//export default model("Note", NoteSchema);

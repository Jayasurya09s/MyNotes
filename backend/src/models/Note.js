import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: { type: String, required: false }, // optional for guest mode
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);
export default Note;

import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  Subject: { type: String, required: true },
  Location: { type: String, required: false },
  StartTime: { type: Date, required: false },
  EndTime: { type: Date, required: false },
  IsAllDay: { type: Boolean, default: false },
  // change db add new fields
  RecurrenceRule: { type: String, required: false },
  StartTimezone: { type: String, required: false },
  EndTimezone: { type: String, required: false },
  Description: { type: String, required: false },
  RecurrenceID: { type: String, required: false },
  RecurrenceException: { type: String, required: false }
}, {
  timestamps: true, // automatically add createdAt and updatedAt fields
});

const Note = mongoose.model("Note", NoteSchema);

export default Note
import Note from "../models/note.model.js";
import mongoose from "mongoose";

export const getNote = async (req, res) => {
    try {
        const notes = await Note.find({});
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
}

export const postNote = async (req, res) => {
    const note = req.body;
    console.log(note);
    if (!note) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const newNote = new Note(note);

    try {
        await newNote.save();
        res.status(201).json({ success: true, data: newNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const deleteNote = async (req, res) => {
	const {id} = req.params; //whatever is after the / in the URL, :id can have any name but it has to match the name in const {id} 
	console.log(`id: ${id}`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
    }
	try {
		const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }
        res.status(200).json({ success: true, message: 'Note deleted' });
	} catch (error) {
        res.status(404).json({ success: true, message: 'Note not found' });
        console.error(error);
	}
}

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const note = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid ID' });
    }
    try {
        const updatedNote = await Note.findByIdAndUpdate(id, note, {new: true}) // new: true returns the updated object, if not set it returns the old one
        res.status(200).json({ success: true, data: updatedNote });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error``' });
    }
} 
// db.runCommand({
// 	renameCollection: "Notes.calendar",
// 	to: "Notes.notes",
// 	dropTarget: true
//   })
import express from "express";
import { getNote, postNote, updateNote, deleteNote } from "../controllers/note.controller.js";

const router = express.Router();

router.get('/', getNote);
router.post('/', postNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
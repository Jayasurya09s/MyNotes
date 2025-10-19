import express from "express";
import {
  getAllNotes,
  createAllNotes,
  updateNotes,
  deleteNote,
  getNoteId,
} from "../contollers/notescontrollers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createAllNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNote);
router.get("/:id", getNoteId);

export default router;

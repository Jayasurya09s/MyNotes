import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const userId = req.query.userId || req.headers['x-user-id'];
    
    // If userId is provided, only return notes for that user
    // If no userId, return empty array (guest users should use local storage)
    if (!userId) {
      return res.status(200).json([]);
    }
    
    const notes = await Note.find({ userId }).sort({ date: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes", error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function getNoteId(req, res) {
  try {
    const userId = req.query.userId || req.headers['x-user-id'];
    const note = await Note.findById(req.params.id);
    
    if (!note) return res.status(404).json({ message: "Not found" });
    
    // If userId is provided, ensure the note belongs to the user
    if (userId && note.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }
    
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in findingNoteId", error);
    res.status(500).json({ message: "Internal Server error" });
  }
}

export async function createAllNotes(req, res) {
  try {
    // Get userId from body first, then fallback to header
    const userId = req.body.userId || req.headers['x-user-id'];
    const { title, content } = req.body;
    
    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    
    // Create note with userId
    const newNote = new Note({ 
      title, 
      content, 
      userId: userId || undefined  // Allow undefined for guest notes if needed
    });
    
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in creatingAllNotes", error);
    res.status(500).json({ message: "Internal Server error", error: error.message });
  }
}

export async function updateNotes(req, res) {
  try {
    // Get userId from body first, then fallback to header
    const userId = req.body.userId || req.headers['x-user-id'];
    const { title, content } = req.body;
    
    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    
    // First check if the note exists and belongs to the user
    const existingNote = await Note.findById(req.params.id);
    if (!existingNote) return res.status(404).json({ message: "Not found" });
    
    if (userId && existingNote.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }
    
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updatingAllNotes", error);
    res.status(500).json({ message: "Internal Server error", error: error.message });
  }
}

export async function deleteNote(req, res) {
  try {
    const userId = req.query.userId || req.headers['x-user-id'];
    
    // First check if the note exists and belongs to the user
    const existingNote = await Note.findById(req.params.id);
    if (!existingNote) return res.status(404).json({ message: "Not found" });
    
    if (userId && existingNote.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }
    
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deletingAllNotes", error);
    res.status(500).json({ message: "Internal Server error", error: error.message });
  }
}
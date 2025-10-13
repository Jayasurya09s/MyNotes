import note from "../models/Note.js";

export async function getAllNotes(req,res) {

    try{
        const notes = await note.find();
        res.status(200).json(notes);
    }
    catch(error){
        console.error("Error in getAllNotes",error);
        res.status(500).json({message:"Internal Server error"});
    }


}
export async function getNoteId(req,res){
    try{
         const noteId =await note.findById(req.params.id);
        if(!noteId) return res.status(404).json({message:"Not found"});
        res.status(201).json({message:"Found ID successfully!"});
    }catch(error){
        console.error("Error in findingNoteId",error);

        res.status(500).json({message:"Internal Server error"});
    }
}

export async function createAllNotes(req,res){
    try{
        const {title,content}=req.body;
        const newNote = new note({ title, content });
        const savedNote = await newNote.save();
        console.log("Saved note:", savedNote);
        
        res.status(201).json({message:"Note created successfully!"});
    }catch(error){
        console.error("Error in creatingAllNotes",error);

        res.status(500).json({message:"Internal Server error"});
    }
}
export async function updateNotes(req,res){
    try{
        const {title,content}=req.body;
        const updatedNote =await note.findByIdAndUpdate(req.params.id,{title,content},{new:true});
        if(!updatedNote) return res.status(404).json({message:"Not found"});
        res.status(200).json({message:"Note updated sucessfully"});
    }catch(error){
        console.error("Error in updatingAllNotes",error);
        res.status(500).json({message:"Internal Server error"});
    }

}
export async function deleteNote(req,res){
    try{
        const {title,content}=req.body;
        const deletedNote =await note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message:"Not found"});
        res.status(200).json({message:"Note deleted sucessfully"});
    }catch(error){
    console.error("Error in deletingAllNotes",error);
    res.status(500).json({message:"Internal Server error"});  
    }

}


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import api from "../api";

export default function HomePage({ user, setUser }) {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to load notes
  const loadNotes = async () => {
    setLoading(true);

    const userStr = localStorage.getItem("firebaseUser");

    if (userStr && userStr !== "null") {
      // User is logged in, fetch cloud notes
      try {
        const res = await api.get("/"); // interceptor adds x-user-id
        setNotes(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch cloud notes");
        setNotes([]);
      }
    } else {
      // Guest mode: load local notes
      const guestNotes = JSON.parse(localStorage.getItem("guestNotes") || "[]");
      setNotes(guestNotes);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      loadNotes(); // fetch cloud notes only after user exists
    } else {
      loadNotes(); // load guest notes
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    if (user) {
      try {
        await api.delete(`/${id}`); // x-user-id header will be sent automatically
        toast.success("Note deleted from cloud!");
        loadNotes();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete note");
      }
    } else {
      const updated = notes.filter((n) => n.id !== id && n._id !== id);
      localStorage.setItem("guestNotes", JSON.stringify(updated));
      setNotes(updated);
      toast.success("Deleted locally!");
    }
  };

  const handleEdit = (id) => navigate(`/note/${id}`);
  const handleCreate = () => navigate("/create");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar user={user} setUser={setUser} />
      <ToastContainer position="top-right" theme="dark" />

      <div className="relative container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              My Notes
            </h1>
            <p className="text-slate-300 mt-2 text-sm sm:text-base">
              {user ? "Your notes are synced to the cloud" : "Notes stored locally"}
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
          >
            Create Note
          </button>
        </div>

        {loading ? (
          <p className="text-slate-300 text-center mt-20">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-slate-300 text-center mt-20">No notes found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map((note) => (
              <div key={note.id || note._id} className="bg-slate-800 p-6 rounded-2xl shadow-xl">
                <h2 className="text-lg font-bold text-white mb-3">{note.title}</h2>
                <p className="text-slate-300 text-sm mb-4">
                  {note.content.length > 120 ? note.content.substring(0, 120) + "..." : note.content}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(note.id || note._id)}
                    className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note.id || note._id)}
                    className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

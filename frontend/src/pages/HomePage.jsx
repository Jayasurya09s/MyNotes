import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import api from "../api";

export default function HomePage({ user, setUser }) {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    if (user) {
      try {
        const res = await api.get(`/?userId=${user.uid}`); // fetch cloud notes for authenticated user
        setNotes(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch cloud notes");
      }
    } else {
      const guestNotes = JSON.parse(localStorage.getItem("guestNotes") || "[]");
      setNotes(guestNotes);
    }
  };

  useEffect(() => {
    loadNotes();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    if (user) {
      try {
        await api.delete(`/${id}?userId=${user.uid}`);
        toast.success("Note deleted from cloud!");
        loadNotes();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete note");
      }
    } else {
      const updated = notes.filter((n) => n.id !== id);
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
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
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
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Note
            </span>
          </button>
        </div>

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-200 mb-2">No notes yet</h3>
            <p className="text-slate-400 text-center max-w-md">
              Start your journey by creating your first note. Your ideas deserve to be captured and organized.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map((note) => (
              <div 
                key={note.id || note._id} 
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-out hover:border-purple-500/50"
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <h2 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {note.title}
                  </h2>
                  <p className="text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {note.content.length > 120 ? note.content.substring(0, 120) + "..." : note.content}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEdit(note.id || note._id)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note.id || note._id)}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

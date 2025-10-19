import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";

export default function NoteDetailPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadNote = async () => {
      if (user) {
        try {
          const res = await api.get(`/${id}?userId=${user.uid}`);
          setNote(res.data);
          setTitle(res.data.title);
          setContent(res.data.content);
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch note");
          navigate("/");
        }
      } else {
        const guestNotes = JSON.parse(localStorage.getItem("guestNotes") || "[]");
        const found = guestNotes.find((n) => n.id === id);
        if (found) {
          setNote(found);
          setTitle(found.title);
          setContent(found.content);
        } else {
          toast.error("Note not found");
          navigate("/");
        }
      }
    };
    loadNote();
  }, [id, user]);

  const handleUpdate = async () => {
    if (!title || !content) return toast.error("Title and content cannot be empty");

    if (user) {
      try {
        await api.put(`/${id}`, { title, content });
        setNote({ ...note, title, content });
        toast.success("Note updated in cloud!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to update note");
      }
    } else {
      const guestNotes = JSON.parse(localStorage.getItem("guestNotes") || "[]");
      const updated = guestNotes.map((n) => (n.id === id ? { ...n, title, content } : n));
      localStorage.setItem("guestNotes", JSON.stringify(updated));
      setNote({ ...note, title, content });
      toast.success("Note updated locally!");
    }
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this note?")) return;

    if (user) {
      try {
        await api.delete(`/${id}?userId=${user.uid}`);
        toast.success("Note deleted from cloud!");
        navigate("/");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete note");
      }
    } else {
      const guestNotes = JSON.parse(localStorage.getItem("guestNotes") || "[]");
      const updated = guestNotes.filter((n) => n.id !== id);
      localStorage.setItem("guestNotes", JSON.stringify(updated));
      toast.success("Note deleted locally!");
      navigate("/");
    }
  };

  if (!note) return <p className="text-white text-center mt-8">Loading note...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar user={user} />
      <ToastContainer position="top-right" theme="dark" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-4xl">
        {!editMode ? (
          /* View Mode */
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
                {note.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(note.date || Date.now()).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-3 3m3-3l3 3m-3 3v6a2 2 0 002 2h4a2 2 0 002-2v-6" />
                  </svg>
                  {user ? "Cloud" : "Local"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="mb-8">
              <p className="text-slate-200 whitespace-pre-wrap leading-relaxed text-base sm:text-lg">
                {note.content}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setEditMode(true)} 
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Note
                </span>
              </button>
              
              <button 
                onClick={handleDelete} 
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Note
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Edit Note
                </h2>
              </div>

              {/* Title Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-lg"
                />
              </div>

              {/* Content Textarea */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={handleUpdate} 
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </span>
                </button>
                
                <button 
                  onClick={() => setEditMode(false)} 
                  className="flex-1 bg-slate-600/50 hover:bg-slate-600/70 border border-slate-500/50 hover:border-slate-500/70 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 ease-out"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

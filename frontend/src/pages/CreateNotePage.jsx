import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import api from "../api";

export default function CreateNotePage({ user }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return toast.error("Title and content cannot be empty");

    if (user) {
      // --- POST to Mongo for logged-in user ---
      try {
        await api.post("/", { title, content, });
        toast.success("Note saved in cloud!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to save note in cloud");
      }
    } else {
      // --- Guest (localStorage) ---
      const guestNotes = JSON.parse(localStorage.getItem("guestNotes") || "[]");
      guestNotes.push({ id: uuidv4(), title, content });
      localStorage.setItem("guestNotes", JSON.stringify(guestNotes));
      toast.success("Note saved locally!");
    }

    setTitle("");
    setContent("");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar user={user} />
      <ToastContainer position="top-right" theme="dark" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Create New Note
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            {user ? "Your note will be saved to the cloud" : "Your note will be saved locally"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8 rounded-2xl shadow-2xl">
          <div className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter a captivating title..."
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
                placeholder="Write your thoughts, ideas, or important information here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-4 px-8 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Note
                </span>
              </button>
              
              <button 
                type="button" 
                onClick={() => navigate("/")} 
                className="flex-1 bg-slate-600/50 hover:bg-slate-600/70 border border-slate-500/50 hover:border-slate-500/70 py-4 px-8 rounded-xl font-semibold text-white transition-all duration-300 ease-out"
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
        </form>
      </div>
    </div>
  );
}

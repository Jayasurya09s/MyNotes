import React from "react";
import { useNavigate } from "react-router-dom";
import MulticolorTitle from "./MultiColorTitle";

export default function NoteCard({ note, onDelete }) {
  const navigate = useNavigate();

  const snippet = note.content.length > 100 ? note.content.slice(0, 100) + "..." : note.content;

  return (
    <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-out hover:border-purple-500/50">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative">
        <div onClick={() => navigate(`/note/${note._id || note.id}`)} className="cursor-pointer">
          <MulticolorTitle text={note.title} className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors" />
          <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">{snippet}</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
          <button
            onClick={onDelete}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

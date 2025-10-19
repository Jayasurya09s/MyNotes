// src/Components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear localStorage
      localStorage.removeItem('firebaseUser');
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed.");
    }
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 px-4 sm:px-6 lg:px-8 py-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link 
          to="/" 
          className="group flex items-center gap-2 sm:gap-3 text-white hover:text-purple-300 transition-colors duration-300"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-bold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            MyNotes
          </span>
        </Link>

        {/* User Section */}
        <div className="flex items-center space-x-2 sm:space-x-4 relative z-10">
          {user ? (
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* User Info - Hidden on mobile, shown on tablet+ */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-200 text-sm font-medium">
                    {user.displayName || 'User'}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {user.email}
                  </span>
                </div>
              </div>

              {/* Mobile User Avatar - Only shown on mobile */}
              <div className="md:hidden w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Status Indicator - Hidden on mobile, shown on tablet+ */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-medium">Synced</span>
              </div>

              {/* Logout Button */}
              <button 
                onClick={handleLogout} 
                className="group relative px-3 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-out cursor-pointer z-10"
                style={{ pointerEvents: 'auto' }}
              >
                <span className="flex items-center gap-1 sm:gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                </span>
              </button>
            </div>
          ) : (
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Login button clicked, navigating to /login");
                toast.info("Navigating to login page...");
                navigate("/login");
              }} 
              onMouseEnter={() => console.log("Mouse entered login button")}
              onMouseLeave={() => console.log("Mouse left login button")}
              className="group relative px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-out cursor-pointer z-10"
              style={{ pointerEvents: 'auto' }}
              type="button"
            >
              <span className="flex items-center gap-1 sm:gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Login</span>
                <span className="sm:hidden">Sign In</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

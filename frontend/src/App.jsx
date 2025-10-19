// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import CreateNotePage from "./pages/CreateNotePage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Only Mongo-connected operations will happen if user exists
        const userData = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
        };
        setUser(userData);
        // Store user data in localStorage for API interceptor
        localStorage.setItem('firebaseUser', JSON.stringify(userData));
      } else {
        setUser(null); // Local storage notes will be used
        localStorage.removeItem('firebaseUser');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
        <Route path="/note/:id" element={<NoteDetailPage user={user} setUser={setUser} />} />
        <Route path="/create" element={<CreateNotePage user={user} setUser={setUser} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

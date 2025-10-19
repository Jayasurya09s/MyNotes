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

  // Load user from Firebase Auth
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
        };
        setUser(userData);
        localStorage.setItem("firebaseUser", JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem("firebaseUser");
      }
    });
    return unsubscribe;
  }, []);

  // Function to check user and get userId for API
  const getUserId = () => {
    return user?.uid || null;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage user={user} getUserId={getUserId} />}
        />
        <Route
          path="/note/:id"
          element={<NoteDetailPage user={user} getUserId={getUserId} />}
        />
        <Route
          path="/create"
          element={<CreateNotePage user={user} getUserId={getUserId} />}
        />
        <Route
          path="/login"
          element={<LoginPage setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

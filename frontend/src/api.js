import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api/notes" || "https://mynotes-0pq4.onrender.com", // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include user ID in headers
api.interceptors.request.use((config) => {
  try {
    const userStr = localStorage.getItem('firebaseUser');
    if (userStr && userStr !== 'null') {
      const user = JSON.parse(userStr);
      if (user && user.uid) {
        config.headers['x-user-id'] = user.uid;
      }
    }
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
  }
  return config;
});

export default api;

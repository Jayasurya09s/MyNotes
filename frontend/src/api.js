import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://mynotes-kmb3.onrender.com/api/notes",
  headers: {
    "Content-Type": "application/json",
  },
});

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

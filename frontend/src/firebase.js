import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCms1UWtRpmUQV6PWnqOhkYNy7rhJ7jbLM",
  authDomain: "mynotes-adbc7.firebaseapp.com",
  projectId: "mynotes-adbc7",
  storageBucket: "mynotes-adbc7.appspot.com",
  messagingSenderId: "391349446495",
  appId: "1:391349446495:web:73485e3ca419045e91f8ea",
  measurementId: "G-QFR0Q5VQLH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;

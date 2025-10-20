import express from "express"
import router from "./routes/noteroutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";


import ratelimiter from "./middleware/ratelimiter.js";
dotenv.config();

const app =express();
const PORT=process.env.PORT || 5001;

// CORS configuration for production and development
const allowedOrigins = [
  "http://localhost:5173",
  "https://my-notes-alpha-orcin.vercel.app",
  process.env.FRONTEND_URL,
  
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. server-to-server / Postman)
    if (!origin) return callback(null, true);
    const normalize = (u) => u.replace(/\/$/, "");
    const normalizedOrigin = normalize(origin);
    const allowed = allowedOrigins.map(normalize);
    if (allowed.includes(normalizedOrigin)) {
      return callback(null, true);
    }
    console.warn("Blocked CORS request from:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

//middleware
app.use(express.json());
app.use(ratelimiter);
app.use("/api/notes",router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(" Server started on port:", PORT);
  });
});




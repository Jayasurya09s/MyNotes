import express from "express"
import router from "./routes/noteroutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";


import ratelimiter from "./middleware/ratelimiter.js";
dotenv.config();

const app =express();
const PORT=process.env.PORT || 5001;

app.use(cors({origin: "http://localhost:5173",credentials: true}));
//middleware
app.use(express.json());
app.use(ratelimiter);
app.use("/api/notes",router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(" Server started on port:", PORT);
  });
});




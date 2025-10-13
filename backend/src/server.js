import express from "express"
import router from "./routes/noteroutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
dotenv.config();

const app =express();
const PORT=process.env.PORT || 5001;


connectDB();
//middleware
app.use(express.json());

app.use("/api/notes",router);


app.listen(PORT,() => {
    console.log(" Server Started on Port :",PORT);
    

});



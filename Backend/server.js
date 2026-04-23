import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.json({message:'StudyFlow Planner is running!'});
});

app.use("/api/tasks", taskRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
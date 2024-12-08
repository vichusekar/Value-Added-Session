import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbConfig.js";
import studentRouter from "./Routes/studentRouter.js";
import subjectRouter from "./Routes/subjectRouter.js";
import markRouter from "./Routes/markRouter.js";
import userRouter from "./Routes/userRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
    res.send("<h1>Welcome to server</h1>")
});

app.use('/api/user', userRouter);
app.use('/api/student', studentRouter);
app.use('/api/subject', subjectRouter);
app.use('/api/marks', markRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App running on port ${PORT}`))
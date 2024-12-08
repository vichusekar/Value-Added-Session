import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbConfig.js";
import userRouter from "./Routes/userRoutes.js";
import blogRouter from "./Routes/blogRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to server</h1>")
});

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

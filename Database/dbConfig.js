import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        let dbName = await process.env.DB_NAME
        await mongoose.connect(`${process.env.DB_URL}/${dbName}`);
        console.log("Database Connected")
    } catch (error) {
        console.log(error, error.message)
    }
};

export default connectDB;
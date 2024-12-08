import mongoose from "mongoose";


const connectDB = async () => {
    try {
        let dbName = process.env.DB_NAME;
        await mongoose.connect(`${process.env.DB_URL}/${dbName}`);
        // res.status(200).json({message: "Database Connected"})
        console.log("Database Connected");
    } catch (error) {
        console.log("error");
    }
};


export default connectDB;

import mongoose from "mongoose";

let studentSchema = new mongoose.Schema({

    name: {type: String, required: true},

    age: {type: String, required: true},

    rollNumber: {type: String, required: true, unique: true}
    
}, {collection:"students", versionKey:false});

let studentModel = mongoose.model("students", studentSchema);

export default studentModel;
import mongoose from "mongoose";

let subjectSchema = new mongoose.Schema({

    name: { type: String, required: true },


}, { collection: "subjects", versionKey: false });

let subjectModel = mongoose.model("subjects", subjectSchema);

export default subjectModel;
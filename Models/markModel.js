import mongoose from "mongoose";

let markSchema = new mongoose.Schema({

    marks: { type: Number, required: true },

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "studentModel",
        required: true
    },

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjectModel",
        required: true
    }
}, { collection: "marks", versionKey: false });

let markModel = mongoose.model("marks", markSchema);

export default markModel;
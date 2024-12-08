import mongoose from "mongoose";

let blogSchema = new mongoose.Schema({

    title: { type: String, required: true },

    content: { type: String, required: true },

    likes: { type: Number },

    commend: {type: String}

}, { collection: "blogs", versionKey: false });

let blogModel = mongoose.model("blogs", blogSchema)

export default blogModel
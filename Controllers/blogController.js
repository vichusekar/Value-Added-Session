import blogModel from "../Models/blogModel.js";
import { upload } from "../Files/file.js";


// create blog with blogModel schema
export const createBlog = ('/create', async (req, res) => {
    try {
        let blog = await blogModel.create(req.body);
        res.status(201).json({ message: "Blog Created Successfully", blog });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
});

// update the blog by id
export const updateBlog = ('/update/:id', async (req, res) => {
    try {
        let blog = await blogModel.findById(req.params.id);
        if (blog) {
            let updatedBlog = await blogModel.findByIdAndUpdate(req.params.id, req.body);
            updatedBlog.save()
            res.status(200).json({ message: "Blog Updated Successfully" });

        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
});

// upload the image file
export const fileupload = ('/upload', async (req, res) => {
    try {

        let blog = await blogModel.findById(req.params.id);
        if (blog) {
            upload(req, res, function (error) {
                if (error) {
                    res.status(400).json({ message: error });
                } else {
                    res.status(201).json({ message: "File uploaded successfully" });
                }
            })
        }

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
});

// delete the blog by id
export const deleteBlog = ('/delete/:id', async (req, res) => {
    try {
        let blog = await blogModel.findById(req.params.id);
        if (blog) {
            await blogModel.deleteOne(req.params._id);
            res.status(200).json({ message: "Blog Deleted Successfullt" });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//like the blog based on the id parameter 
export const likeBlog = ('/like/:id', async (req, res) => {
    try {
        let blogId = await blogModel.findById(req.params.id);

        let blog = await blogModel.findByIdAndUpdate(
            blogId,
            { $inc: { Likes: 1 } },
            { new: true }
        )
        if (blog) {
            blog.save()
            res.status(201).json({ message: "Blog liked successfully" });
        } else {
            res.status(400).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
});

//comment the blog by id
export const comment = ('/comment/:id', async (req, res) => {
    try {
        let blog = await blogModel.findOne({ id: req.params._id });
        if (blog) {
            let commentedBlog = await blogModel.findByIdAndUpdate(req.params.id, req.body);
            // .save()
            res.status(201).json({ message: "Comment Posted Successfully"});
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
});


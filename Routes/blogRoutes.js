import express from "express";
import { comment, createBlog, deleteBlog, fileupload, likeBlog, updateBlog } from "../Controllers/blogController.js";
import { admin, validate } from "../Middlewares/authentication.js";

const router = express.Router();

router.post('/upload', fileupload);

router.post('/create', createBlog);

router.post('/update/:id', updateBlog);

router.post('/like/:id', likeBlog);

router.post('/delete/:id', validate, admin, deleteBlog);

router.post('/comment/:id', comment);

export default router;
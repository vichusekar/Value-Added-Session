import express from "express";
import { createStudent, deleteStudent, getallStudents, getStudent, updateStudent } from "../Controllers/studentController.js";
import {validate, admin} from "../Middlewares/authentication.js";

const router = express.Router();

router.post('/create', createStudent);

router.get('/allstudents', getallStudents);

router.get('/student/:id', getStudent);

router.put('/update/:id', updateStudent);

router.delete('/delete/:id', validate, admin, deleteStudent);

export default router;

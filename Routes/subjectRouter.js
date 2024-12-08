import express from "express";
import { createSubject, deleteSubject, getallSubjects, getSubject, updateSubject } from "../Controllers/subjectController.js";

const router = express.Router();

router.post('/create', createSubject);

router.get('/allsubjects', getallSubjects);

router.put('/update/:id', updateSubject);

router.get('/subject/:id', getSubject);

router.delete('/delete/:id', deleteSubject);

export default router; 
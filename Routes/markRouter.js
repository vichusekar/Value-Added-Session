import express from "express";
import { createMark, getallMarks } from "../Controllers/markController.js";
import { reportcardGenerator } from "../Utils/reportGenerator.js";

const router = express.Router();

router.post('/create', createMark);

router.get('/allmarks', getallMarks);

router.get('/report-generator', reportcardGenerator)

export default router;

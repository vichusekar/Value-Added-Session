import express from "express";
import { forgotPassword, login, resetPassword, signup } from "../Controllers/userController.js";

const router = express.Router();

router.post('/sign-up', signup);

router.post('/sign-in', login);

router.post('/forgot-password/:id', forgotPassword);

router.post('/reset-password/:id', resetPassword);



export default router;
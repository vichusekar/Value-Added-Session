import express from "express";
import { forgotPassword, login, register, resetPassword } from "../Controllers/userController.js";

const router = express.Router();

router.post('/sign-up', register);

router.post('/sign-in', login);

router.post('/forgot-password/:id', forgotPassword);

router.post('/reset-password/:id', resetPassword);

export default router;
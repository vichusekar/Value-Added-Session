import { comparePassword, createToken, hashPassword } from "../Middlewares/authentication.js";
import UserModel from "../Models/userModels.js";
import nodemailer from "nodemailer";


//signup as a user
export const signup = ('/sign-up', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            req.body.password = await hashPassword(req.body.password)
            let newUser = await UserModel.create(req.body)
            res.status(201).json({ message: "User Created Successfully", newUser });
        } else {
            res.status(400).json({ message: `User with ${req.body.email} already exist` });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
});


//login as a existing user
export const login = ('/sign-in', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            if (await comparePassword(req.body.password, user.password)) {
                let token = await createToken(user)
                res.status(200).json({ message: "Login Successfully", token });

            } else {
                res.status(404).json({ message: "Invalid Credential" });
            }
        } else {
            res.status(404).json({ message: `User with ${req.body.password} do not exist` });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
});


//forgot-password by user with existing email
export const forgotPassword = ('/forgot-password/:id', async (req, res) => {
    try {
        const oldUser = await UserModel.findOne({ email: req.body.email });
        if (oldUser) {
            const passwordLink = `http://localhost:3000/${oldUser._id}`

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vigneshecom093@gmail.com',
                    pass: 'kznv npox aaxy nnvp'
                }
            })

            var mailOptions = {
                from: 'vigneshmsho093@gmail.com',
                to: req.body.email,
                subject: 'Reset your password ',
                text: `Kindly visit the link and change your password ${passwordLink}`,
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
            res.status(200).json({ message: 'Email Sent Successfully' });

        }

        else {
            res.status(404).json({ message: `User with ${req.body.email} doesn't exists`, error: error?.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error?.message });

    }
});


//reset-password with provide forgot-password link
export const resetPassword = ('/reset-password/:id', async (req, res) => {
    try {
        let user = await UserModel.findById({ _id: req.params.id });
        if (user) {
            user.password = await hashPassword(req.body.password);
            user.save()
            res.status(200).json({ message: "Password Updated Successfullly" });
        }
        else {
            res.status(404).json({ message: `User not found` });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
});